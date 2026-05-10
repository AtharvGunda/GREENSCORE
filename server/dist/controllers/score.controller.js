"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBenchmark = exports.getScoreHistory = exports.getCurrentScore = void 0;
const database_js_1 = require("../config/database.js");
const getCurrentScore = async (req, res) => {
    try {
        const userId = req.user.id;
        const scoreRes = await (0, database_js_1.dbQuery)('SELECT * FROM green_scores WHERE company_id = $1 ORDER BY calculated_at DESC LIMIT 1', [userId]);
        if (!scoreRes.rowCount) {
            return res.status(404).json({ error: 'No score found for this company' });
        }
        res.json(scoreRes.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getCurrentScore = getCurrentScore;
const getScoreHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const scores = await (0, database_js_1.dbQuery)('SELECT * FROM green_scores WHERE company_id = $1 ORDER BY calculated_at DESC', [userId]);
        res.json(scores.rows);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getScoreHistory = getScoreHistory;
const getBenchmark = async (req, res) => {
    try {
        const userId = req.user.id;
        const companyRes = await (0, database_js_1.dbQuery)('SELECT sector FROM companies WHERE id = $1', [userId]);
        if (!companyRes.rowCount)
            return res.status(404).json({ error: 'Company not found' });
        const benchmarkRes = await (0, database_js_1.dbQuery)('SELECT * FROM sector_benchmarks WHERE sector = $1', [companyRes.rows[0].sector]);
        res.json(benchmarkRes.rows[0] || {});
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getBenchmark = getBenchmark;
