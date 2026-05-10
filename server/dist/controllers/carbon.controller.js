"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFactors = exports.getHistory = exports.submitEmissions = void 0;
const database_js_1 = require("../config/database.js");
const carbonEngine_service_js_1 = require("../services/carbonEngine.service.js");
const scoringAlgorithm_service_js_1 = require("../services/scoringAlgorithm.service.js");
const emissionFactors_js_1 = require("../constants/emissionFactors.js");
const submitEmissions = async (req, res) => {
    try {
        const userId = req.user.id;
        const data = req.body; // Full emissions form data
        // Get company revenue and sector
        const companyRes = await (0, database_js_1.dbQuery)('SELECT sector, annual_revenue_cr FROM companies WHERE id = $1', [userId]);
        if (!companyRes.rowCount)
            return res.status(404).json({ error: 'Company not found' });
        const company = companyRes.rows[0];
        // Calculate absolute emissions
        const emissions = (0, carbonEngine_service_js_1.calculateEmissions)(data, company.annual_revenue_cr);
        // Save record
        const recordRes = await (0, database_js_1.dbQuery)(`INSERT INTO emissions_records (
        company_id, financial_year, electricity_mwh_per_cr, diesel_litres_per_cr, lpg_kg_per_cr, petrol_litres_per_cr,
        purchased_steam_gj_per_cr, business_travel_km_per_cr, water_withdrawal_kl_per_cr, water_recycled_pct,
        wastewater_treated_pct, waste_generated_t_per_cr, hazardous_waste_pct, waste_recycled_pct,
        renewable_energy_pct, green_capex_per_cr, has_env_policy, has_reduction_targets, third_party_verified,
        total_co2e_scope1, total_co2e_scope2, total_co2e_scope3
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
      RETURNING *`, [
            userId, data.financial_year, data.electricity_mwh_per_cr, data.diesel_litres_per_cr, data.lpg_kg_per_cr,
            data.petrol_litres_per_cr, data.purchased_steam_gj_per_cr, data.business_travel_km_per_cr,
            data.water_withdrawal_kl_per_cr, data.water_recycled_pct, data.wastewater_treated_pct,
            data.waste_generated_t_per_cr, data.hazardous_waste_pct, data.waste_recycled_pct,
            data.renewable_energy_pct, data.green_capex_per_cr, data.has_env_policy, data.has_reduction_targets,
            data.third_party_verified, emissions.total_co2e_scope1, emissions.total_co2e_scope2, emissions.total_co2e_scope3
        ]);
        const record = recordRes.rows[0];
        // Fetch Benchmark
        const benchmarkRes = await (0, database_js_1.dbQuery)('SELECT * FROM sector_benchmarks WHERE sector = $1', [company.sector]);
        let benchmark = benchmarkRes.rows[0];
        if (!benchmark) {
            // Fallback benchmark if not seeded
            benchmark = { avg_electricity_mwh_per_cr: 50, avg_diesel_litres_per_cr: 100, avg_water_kl_per_cr: 500, avg_waste_t_per_cr: 10, avg_renewable_pct: 5, avg_greenscore: 55.6 };
        }
        // Calculate Score
        const score = (0, scoringAlgorithm_service_js_1.calculateGreenScore)(record, benchmark, company.annual_revenue_cr);
        // Save Score
        const scoreRes = await (0, database_js_1.dbQuery)(`INSERT INTO green_scores (
        company_id, emissions_record_id, financial_year, energy_score, water_score, waste_score,
        renewables_score, governance_score, total_score, sector_percentile, sector_benchmark_score,
        score_tier, loan_eligible
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`, [
            userId, record.id, data.financial_year, score.energy_score, score.water_score, score.waste_score,
            score.renewables_score, score.governance_score, score.total_score, score.sector_percentile,
            score.sector_benchmark_score, score.score_tier, score.loan_eligible
        ]);
        res.status(201).json({ record, score: scoreRes.rows[0] });
    }
    catch (error) {
        console.error('Submit emissions error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.submitEmissions = submitEmissions;
const getHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const records = await (0, database_js_1.dbQuery)('SELECT * FROM emissions_records WHERE company_id = $1 ORDER BY created_at DESC', [userId]);
        res.json(records.rows);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getHistory = getHistory;
const getFactors = (req, res) => {
    res.json({ factors: emissionFactors_js_1.EMISSION_FACTORS, sources: emissionFactors_js_1.FACTOR_SOURCES });
};
exports.getFactors = getFactors;
