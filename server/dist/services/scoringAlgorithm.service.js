"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateGreenScore = void 0;
const cat_score = (company_intensity, sector_benchmark) => {
    if (sector_benchmark === 0)
        return 100; // avoid div by 0
    const ratio = company_intensity / sector_benchmark;
    const raw_score = 100 * (2 - ratio) / 1.8;
    return Math.min(Math.max(raw_score, 0), 100);
};
const calculateGreenScore = (record, benchmark, revenue_cr) => {
    // 1. Energy & Carbon (Scope 1+2 CO2e intensity)
    // Assuming benchmark.avg_electricity_mwh_per_cr and diesel are used to calc benchmark co2e intensity.
    // Actually, we can just compare the CO2e intensities directly.
    // Let's calculate total CO2e per CR for company
    const company_co2e_per_cr = ((record.electricity_mwh_per_cr || 0) * 1000 * 0.71 / 1000) +
        ((record.diesel_litres_per_cr || 0) * 2.68 / 1000) +
        ((record.lpg_kg_per_cr || 0) * 1.56 / 1000);
    const benchmark_co2e_per_cr = ((benchmark.avg_electricity_mwh_per_cr || 0) * 1000 * 0.71 / 1000) +
        ((benchmark.avg_diesel_litres_per_cr || 0) * 2.68 / 1000);
    const energy_score = cat_score(company_co2e_per_cr, benchmark_co2e_per_cr);
    // 2. Water Management
    const water_usage_score = cat_score(record.water_withdrawal_kl_per_cr, benchmark.avg_water_kl_per_cr);
    const water_score = (water_usage_score * 0.6) +
        ((record.water_recycled_pct / 100) * 20) +
        ((record.wastewater_treated_pct / 100) * 20);
    // 3. Waste Management
    const waste_usage_score = cat_score(record.waste_generated_t_per_cr, benchmark.avg_waste_t_per_cr);
    const waste_score = (waste_usage_score * 0.6) +
        (((100 - record.hazardous_waste_pct) / 100) * 20) +
        ((record.waste_recycled_pct / 100) * 20);
    // 4. Renewable & Clean Initiatives
    const renew_score = (record.renewable_energy_pct / 100) * 100;
    // 5. Reporting Quality & Governance
    const gov_score = (record.has_env_policy ? 33.3 : 0) +
        (record.has_reduction_targets ? 33.3 : 0) +
        (record.third_party_verified ? 33.4 : 0);
    // Final Score
    const total_score = (energy_score * 0.40) +
        (water_score * 0.20) +
        (waste_score * 0.20) +
        (renew_score * 0.10) +
        (gov_score * 0.10);
    // Determine Tier
    let score_tier = 'Poor';
    let loan_eligible = false;
    if (total_score >= 80) {
        score_tier = 'Excellent';
        loan_eligible = true;
    }
    else if (total_score >= 65) {
        score_tier = 'Good';
        loan_eligible = true;
    }
    else if (total_score >= 50) {
        score_tier = 'Average';
        loan_eligible = true;
    } // Average might have limited
    else if (total_score >= 35) {
        score_tier = 'Below Average';
        loan_eligible = false;
    }
    // We can calculate percentile roughly or rely on DB later.
    const sector_percentile = Math.min(100, Math.max(0, (total_score / benchmark.avg_greenscore) * 50));
    return {
        energy_score: Number(energy_score.toFixed(2)),
        water_score: Number(water_score.toFixed(2)),
        waste_score: Number(waste_score.toFixed(2)),
        renewables_score: Number(renew_score.toFixed(2)),
        governance_score: Number(gov_score.toFixed(2)),
        total_score: Number(total_score.toFixed(2)),
        score_tier,
        loan_eligible,
        sector_percentile: Number(sector_percentile.toFixed(2)),
        sector_benchmark_score: benchmark.avg_greenscore
    };
};
exports.calculateGreenScore = calculateGreenScore;
