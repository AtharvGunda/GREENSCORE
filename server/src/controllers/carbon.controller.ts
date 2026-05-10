import { Request, Response } from 'express';
import { dbQuery } from '../config/database';
import { calculateEmissions } from '../services/carbonEngine.service';
import { calculateGreenScore } from '../services/scoringAlgorithm.service';
import { EMISSION_FACTORS, FACTOR_SOURCES } from '../constants/emissionFactors';

export const submitEmissions = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const data = req.body; // Full emissions form data
    
    // Get company revenue and sector
    const companyRes = await dbQuery('SELECT sector, annual_revenue_cr FROM companies WHERE id = $1', [userId]);
    if (!companyRes.rowCount) return res.status(404).json({ error: 'Company not found' });
    const company = companyRes.rows[0];

    // Calculate absolute emissions
    const emissions = calculateEmissions(data, company.annual_revenue_cr);

    // Delete existing records for the same financial year to allow re-submission
    await dbQuery('DELETE FROM green_scores WHERE company_id = $1 AND financial_year = $2', [userId, data.financial_year]);
    await dbQuery('DELETE FROM emissions_records WHERE company_id = $1 AND financial_year = $2', [userId, data.financial_year]);

    // Save record
    const recordRes = await dbQuery(
      `INSERT INTO emissions_records (
        company_id, financial_year, electricity_mwh_per_cr, diesel_litres_per_cr, lpg_kg_per_cr, petrol_litres_per_cr,
        purchased_steam_gj_per_cr, business_travel_km_per_cr, water_withdrawal_kl_per_cr, water_recycled_pct,
        wastewater_treated_pct, waste_generated_t_per_cr, hazardous_waste_pct, waste_recycled_pct,
        renewable_energy_pct, green_capex_per_cr, has_env_policy, has_reduction_targets, third_party_verified,
        total_co2e_scope1, total_co2e_scope2, total_co2e_scope3
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
      RETURNING *`,
      [
        userId, data.financial_year, data.electricity_mwh_per_cr, data.diesel_litres_per_cr, data.lpg_kg_per_cr,
        data.petrol_litres_per_cr, data.purchased_steam_gj_per_cr, data.business_travel_km_per_cr,
        data.water_withdrawal_kl_per_cr, data.water_recycled_pct, data.wastewater_treated_pct,
        data.waste_generated_t_per_cr, data.hazardous_waste_pct, data.waste_recycled_pct,
        data.renewable_energy_pct, data.green_capex_per_cr, data.has_env_policy, data.has_reduction_targets,
        data.third_party_verified, emissions.total_co2e_scope1, emissions.total_co2e_scope2, emissions.total_co2e_scope3
      ]
    );

    const record = recordRes.rows[0];

    // Fetch Benchmark
    const benchmarkRes = await dbQuery('SELECT * FROM sector_benchmarks WHERE sector = $1', [company.sector]);
    let benchmark = benchmarkRes.rows[0];
    if (!benchmark) {
      // Fallback benchmark if not seeded
      benchmark = { avg_electricity_mwh_per_cr: 50, avg_diesel_litres_per_cr: 100, avg_water_kl_per_cr: 500, avg_waste_t_per_cr: 10, avg_renewable_pct: 5, avg_greenscore: 55.6 };
    }

    // Calculate Score
    const score = calculateGreenScore(record, benchmark, company.annual_revenue_cr);

    // Save Score
    const scoreRes = await dbQuery(
      `INSERT INTO green_scores (
        company_id, emissions_record_id, financial_year, energy_score, water_score, waste_score,
        renewables_score, governance_score, total_score, sector_percentile, sector_benchmark_score,
        score_tier, loan_eligible
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [
        userId, record.id, data.financial_year, score.energy_score, score.water_score, score.waste_score,
        score.renewables_score, score.governance_score, score.total_score, score.sector_percentile,
        score.sector_benchmark_score, score.score_tier, score.loan_eligible
      ]
    );

    // Dynamic Sector Percentile Engine
    const rankRes = await dbQuery(`
      WITH ranked_scores AS (
        SELECT 
          id, 
          company_id,
          PERCENT_RANK() OVER (ORDER BY total_score ASC) as pct_rank
        FROM green_scores
        WHERE company_id IN (SELECT id FROM companies WHERE sector = $1)
      )
      SELECT pct_rank, (SELECT count(*) FROM ranked_scores) as total_count 
      FROM ranked_scores 
      WHERE company_id = $2
    `, [company.sector, userId]);

    let percentile = 100; // Default to Top 1% if only company
    if (rankRes.rowCount && rankRes.rowCount > 0) {
      const rawRank = Number(rankRes.rows[0].pct_rank);
      const totalCount = Number(rankRes.rows[0].total_count);
      // PERCENT_RANK returns 0 if there is only 1 row.
      percentile = totalCount <= 1 ? 100 : Math.round(rawRank * 100);
    }

    // Update DB
    await dbQuery('UPDATE green_scores SET sector_percentile = $1 WHERE id = $2', [percentile, scoreRes.rows[0].id]);
    
    const finalScore = { ...scoreRes.rows[0], sector_percentile: percentile };

    res.status(201).json({ record, score: finalScore });
  } catch (error) {
    console.error('Submit emissions error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const records = await dbQuery('SELECT * FROM emissions_records WHERE company_id = $1 ORDER BY created_at DESC', [userId]);
    res.json(records.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getFactors = (req: Request, res: Response) => {
  res.json({ factors: EMISSION_FACTORS, sources: FACTOR_SOURCES });
};
