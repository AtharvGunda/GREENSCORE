import { EmissionsRecord, SectorBenchmark, GreenScore } from '../../../shared/types';

const cat_score = (company_intensity: number, sector_benchmark: number): number => {
  if (sector_benchmark === 0 || isNaN(sector_benchmark)) return 100; // avoid div by 0
  const ratio = company_intensity / sector_benchmark;
  if (isNaN(ratio)) return 0;
  
  // Use linear clamp formula from the Excel sheet:
  const raw_score = 100 * (2 - ratio) / 1.8;
  return Math.min(Math.max(raw_score, 0), 100);
};

const SECTOR_BENCHMARKS: Record<string, { co2e: number; water: number; waste: number; avg_greenscore: number }> = {
  'Textile & Apparel': { co2e: 32000, water: 1400, waste: 2.2, avg_greenscore: 55.6 },
  'Food Processing': { co2e: 18000, water: 700, waste: 1.5, avg_greenscore: 55.6 },
  'Auto Parts': { co2e: 25000, water: 800, waste: 2.2, avg_greenscore: 55.6 },
  'Logistics': { co2e: 85000, water: 200, waste: 0.5, avg_greenscore: 55.6 },
  'IT Services': { co2e: 6000, water: 140, waste: 0.22, avg_greenscore: 55.6 },
  'Chemical': { co2e: 55000, water: 3000, waste: 4.5, avg_greenscore: 55.6 }
};

export const calculateGreenScore = (
  record: EmissionsRecord,
  benchmark: SectorBenchmark,
  revenue_cr: number
): Partial<GreenScore> => {
  const sectorName = benchmark.sector || 'Textile & Apparel';
  const sectorBench = SECTOR_BENCHMARKS[sectorName] || SECTOR_BENCHMARKS['Textile & Apparel'];

  // If no operational data is entered, return 0 for all scores
  const hasOperationalData =
    (Number(record.electricity_mwh_per_cr) || 0) > 0 ||
    (Number(record.diesel_litres_per_cr) || 0) > 0 ||
    (Number(record.petrol_litres_per_cr) || 0) > 0 ||
    (Number(record.lpg_kg_per_cr) || 0) > 0 ||
    (Number(record.purchased_steam_gj_per_cr) || 0) > 0 ||
    (Number(record.business_travel_km_per_cr) || 0) > 0 ||
    (Number(record.water_withdrawal_kl_per_cr) || 0) > 0 ||
    (Number(record.waste_generated_t_per_cr) || 0) > 0 ||
    (Number(record.renewable_energy_pct) || 0) > 0 ||
    (Number(record.green_capex_per_cr) || 0) > 0;

  if (!hasOperationalData) {
    return {
      energy_score: 0,
      water_score: 0,
      waste_score: 0,
      renewables_score: 0,
      governance_score: 0,
      total_score: 0,
      score_tier: 'Poor',
      loan_eligible: false,
      sector_percentile: 0,
      sector_benchmark_score: sectorBench.avg_greenscore
    };
  }

  // 1. Energy & Carbon (Scope 1+2+3 CO2e intensity in kg/Cr, matching Excel formulas)
  const company_co2e_per_cr =
    ((Number(record.electricity_mwh_per_cr) || 0) * 0.71) +
    ((Number(record.diesel_litres_per_cr) || 0) * 2.68) +
    ((Number(record.lpg_kg_per_cr) || 0) * 1.56) +
    ((Number(record.petrol_litres_per_cr) || 0) * 2.31) +
    ((Number(record.purchased_steam_gj_per_cr) || 0) * 56.1) +
    ((Number(record.business_travel_km_per_cr) || 0) * 0.089);

  // If company has no operational data for CO2e (all emissions inputs are 0 or empty), energy_score = 0
  const is_co2e_entered = 
    (Number(record.electricity_mwh_per_cr) || 0) > 0 ||
    (Number(record.diesel_litres_per_cr) || 0) > 0 ||
    (Number(record.lpg_kg_per_cr) || 0) > 0 ||
    (Number(record.petrol_litres_per_cr) || 0) > 0 ||
    (Number(record.purchased_steam_gj_per_cr) || 0) > 0 ||
    (Number(record.business_travel_km_per_cr) || 0) > 0;
  
  const energy_score = is_co2e_entered ? cat_score(company_co2e_per_cr, sectorBench.co2e) : 0;

  // 2. Water Management
  // If water withdrawal kl is 0, water_score is 0. Otherwise, calculate with usage score + recycle% + treat%
  const is_water_entered = (Number(record.water_withdrawal_kl_per_cr) || 0) > 0;
  const water_usage_score = is_water_entered ? cat_score(Number(record.water_withdrawal_kl_per_cr), sectorBench.water) : 0;
  const water_score = is_water_entered ? ((water_usage_score * 0.6) +
    ((Number(record.water_recycled_pct) || 0) * 0.2) +
    ((Number(record.wastewater_treated_pct) || 0) * 0.2)) : 0;

  // 3. Waste Management
  // If waste generated is 0, waste_score is 0. Otherwise, calculate with usage score + (100 - haz%) + recycle%
  const is_waste_entered = (Number(record.waste_generated_t_per_cr) || 0) > 0;
  const waste_usage_score = is_waste_entered ? cat_score(Number(record.waste_generated_t_per_cr), sectorBench.waste) : 0;
  const waste_score = is_waste_entered ? ((waste_usage_score * 0.6) +
    ((100 - (Number(record.hazardous_waste_pct) || 0)) * 0.2) +
    ((Number(record.waste_recycled_pct) || 0) * 0.2)) : 0;

  // 4. Renewable & Clean Initiatives
  const renew_score = (Number(record.renewable_energy_pct) || 0);

  // 5. Reporting Quality & Governance
  const gov_score =
    (record.has_env_policy ? 33.3 : 0) +
    (record.has_reduction_targets ? 33.3 : 0) +
    (record.third_party_verified ? 33.4 : 0);

  // Final Score
  const total_score =
    (energy_score * 0.40) +
    (water_score * 0.20) +
    (waste_score * 0.20) +
    (renew_score * 0.10) +
    (gov_score * 0.10);

  // Determine Tier
  let score_tier = 'Poor';
  let loan_eligible = false;
  if (total_score >= 80) { score_tier = 'Excellent'; loan_eligible = true; }
  else if (total_score >= 65) { score_tier = 'Good'; loan_eligible = true; }
  else if (total_score >= 50) { score_tier = 'Average'; loan_eligible = true; } // Average might have limited
  else if (total_score >= 35) { score_tier = 'Below Average'; loan_eligible = false; }

  return {
    energy_score: Number(energy_score.toFixed(2)),
    water_score: Number(water_score.toFixed(2)),
    waste_score: Number(waste_score.toFixed(2)),
    renewables_score: Number(renew_score.toFixed(2)),
    governance_score: Number(gov_score.toFixed(2)),
    total_score: Number(total_score.toFixed(2)),
    score_tier,
    loan_eligible,
    sector_percentile: 0, // Will be calculated by the DB engine
    sector_benchmark_score: sectorBench.avg_greenscore
  };
};
