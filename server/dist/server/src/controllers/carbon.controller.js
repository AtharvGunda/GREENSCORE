"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFactors = exports.getHistory = exports.submitEmissions = void 0;
var database_1 = require("../config/database");
var carbonEngine_service_1 = require("../services/carbonEngine.service");
var scoringAlgorithm_service_1 = require("../services/scoringAlgorithm.service");
var emissionFactors_1 = require("../constants/emissionFactors");
var submitEmissions = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, data, companyRes, company, emissions, recordRes, record, benchmarkRes, benchmark, score, scoreRes, rankRes, percentile, rawRank, totalCount, finalScore, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 9, , 10]);
                userId = req.user.id;
                data = req.body;
                return [4 /*yield*/, (0, database_1.dbQuery)('SELECT sector, annual_revenue_cr FROM companies WHERE id = $1', [userId])];
            case 1:
                companyRes = _a.sent();
                if (!companyRes.rowCount)
                    return [2 /*return*/, res.status(404).json({ error: 'Company not found' })];
                company = companyRes.rows[0];
                emissions = (0, carbonEngine_service_1.calculateEmissions)(data, company.annual_revenue_cr);
                // Delete existing records for the same financial year to allow re-submission
                return [4 /*yield*/, (0, database_1.dbQuery)('DELETE FROM green_scores WHERE company_id = $1 AND financial_year = $2', [userId, data.financial_year])];
            case 2:
                // Delete existing records for the same financial year to allow re-submission
                _a.sent();
                return [4 /*yield*/, (0, database_1.dbQuery)('DELETE FROM emissions_records WHERE company_id = $1 AND financial_year = $2', [userId, data.financial_year])];
            case 3:
                _a.sent();
                return [4 /*yield*/, (0, database_1.dbQuery)("INSERT INTO emissions_records (\n        company_id, financial_year, electricity_mwh_per_cr, diesel_litres_per_cr, lpg_kg_per_cr, petrol_litres_per_cr,\n        purchased_steam_gj_per_cr, business_travel_km_per_cr, water_withdrawal_kl_per_cr, water_recycled_pct,\n        wastewater_treated_pct, waste_generated_t_per_cr, hazardous_waste_pct, waste_recycled_pct,\n        renewable_energy_pct, green_capex_per_cr, has_env_policy, has_reduction_targets, third_party_verified,\n        total_co2e_scope1, total_co2e_scope2, total_co2e_scope3\n      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)\n      RETURNING *", [
                        userId, data.financial_year, data.electricity_mwh_per_cr, data.diesel_litres_per_cr, data.lpg_kg_per_cr,
                        data.petrol_litres_per_cr, data.purchased_steam_gj_per_cr, data.business_travel_km_per_cr,
                        data.water_withdrawal_kl_per_cr, data.water_recycled_pct, data.wastewater_treated_pct,
                        data.waste_generated_t_per_cr, data.hazardous_waste_pct, data.waste_recycled_pct,
                        data.renewable_energy_pct, data.green_capex_per_cr, data.has_env_policy, data.has_reduction_targets,
                        data.third_party_verified, emissions.total_co2e_scope1, emissions.total_co2e_scope2, emissions.total_co2e_scope3
                    ])];
            case 4:
                recordRes = _a.sent();
                record = recordRes.rows[0];
                return [4 /*yield*/, (0, database_1.dbQuery)('SELECT * FROM sector_benchmarks WHERE sector = $1', [company.sector])];
            case 5:
                benchmarkRes = _a.sent();
                benchmark = benchmarkRes.rows[0];
                if (!benchmark) {
                    // Fallback benchmark if not seeded
                    benchmark = { avg_electricity_mwh_per_cr: 50, avg_diesel_litres_per_cr: 100, avg_water_kl_per_cr: 500, avg_waste_t_per_cr: 10, avg_renewable_pct: 5, avg_greenscore: 55.6 };
                }
                score = (0, scoringAlgorithm_service_1.calculateGreenScore)(record, benchmark, company.annual_revenue_cr);
                return [4 /*yield*/, (0, database_1.dbQuery)("INSERT INTO green_scores (\n        company_id, emissions_record_id, financial_year, energy_score, water_score, waste_score,\n        renewables_score, governance_score, total_score, sector_percentile, sector_benchmark_score,\n        score_tier, loan_eligible\n      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *", [
                        userId, record.id, data.financial_year, score.energy_score, score.water_score, score.waste_score,
                        score.renewables_score, score.governance_score, score.total_score, score.sector_percentile,
                        score.sector_benchmark_score, score.score_tier, score.loan_eligible
                    ])];
            case 6:
                scoreRes = _a.sent();
                return [4 /*yield*/, (0, database_1.dbQuery)("\n      WITH ranked_scores AS (\n        SELECT \n          id, \n          company_id,\n          PERCENT_RANK() OVER (ORDER BY total_score ASC) as pct_rank\n        FROM green_scores\n        WHERE company_id IN (SELECT id FROM companies WHERE sector = $1)\n      )\n      SELECT pct_rank, (SELECT count(*) FROM ranked_scores) as total_count \n      FROM ranked_scores \n      WHERE company_id = $2\n    ", [company.sector, userId])];
            case 7:
                rankRes = _a.sent();
                percentile = 100;
                if (rankRes.rowCount && rankRes.rowCount > 0) {
                    rawRank = Number(rankRes.rows[0].pct_rank);
                    totalCount = Number(rankRes.rows[0].total_count);
                    // PERCENT_RANK returns 0 if there is only 1 row.
                    percentile = totalCount <= 1 ? 100 : Math.round(rawRank * 100);
                }
                // Update DB
                return [4 /*yield*/, (0, database_1.dbQuery)('UPDATE green_scores SET sector_percentile = $1 WHERE id = $2', [percentile, scoreRes.rows[0].id])];
            case 8:
                // Update DB
                _a.sent();
                finalScore = __assign(__assign({}, scoreRes.rows[0]), { sector_percentile: percentile });
                res.status(201).json({ record: record, score: finalScore });
                return [3 /*break*/, 10];
            case 9:
                error_1 = _a.sent();
                console.error('Submit emissions error:', error_1);
                res.status(500).json({ error: 'Server error' });
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.submitEmissions = submitEmissions;
var getHistory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, records, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.user.id;
                return [4 /*yield*/, (0, database_1.dbQuery)('SELECT * FROM emissions_records WHERE company_id = $1 ORDER BY created_at DESC', [userId])];
            case 1:
                records = _a.sent();
                res.json(records.rows);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ error: 'Server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getHistory = getHistory;
var getFactors = function (req, res) {
    res.json({ factors: emissionFactors_1.EMISSION_FACTORS, sources: emissionFactors_1.FACTOR_SOURCES });
};
exports.getFactors = getFactors;
