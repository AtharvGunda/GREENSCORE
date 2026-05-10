"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoanById = exports.getEligibleLoans = exports.listLoans = void 0;
const database_js_1 = require("../config/database.js");
const listLoans = async (req, res) => {
    try {
        const loans = await (0, database_js_1.dbQuery)('SELECT * FROM loan_offers WHERE is_active = TRUE');
        res.json(loans.rows);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.listLoans = listLoans;
const getEligibleLoans = async (req, res) => {
    try {
        const userId = req.user.id;
        // Get latest score
        const scoreRes = await (0, database_js_1.dbQuery)('SELECT total_score FROM green_scores WHERE company_id = $1 ORDER BY calculated_at DESC LIMIT 1', [userId]);
        if (!scoreRes.rowCount)
            return res.json([]);
        const score = scoreRes.rows[0].total_score;
        // Get company sector
        const companyRes = await (0, database_js_1.dbQuery)('SELECT sector FROM companies WHERE id = $1', [userId]);
        const sector = companyRes.rows[0].sector;
        // Find eligible loans
        // Array overlap check or null means all sectors
        const query = `
      SELECT * FROM loan_offers 
      WHERE is_active = TRUE 
      AND min_score <= $1 
      AND (eligible_sectors IS NULL OR $2 = ANY(eligible_sectors))
    `;
        const loans = await (0, database_js_1.dbQuery)(query, [score, sector]);
        res.json(loans.rows);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getEligibleLoans = getEligibleLoans;
const getLoanById = async (req, res) => {
    try {
        const { id } = req.params;
        const loan = await (0, database_js_1.dbQuery)('SELECT * FROM loan_offers WHERE id = $1', [id]);
        if (!loan.rowCount)
            return res.status(404).json({ error: 'Loan not found' });
        res.json(loan.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getLoanById = getLoanById;
