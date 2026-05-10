"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_js_1 = require("../config/database.js");
const env_js_1 = require("../config/env.js");
const register = async (req, res) => {
    try {
        const { name, gstin, sector, annual_revenue_cr, state, city, email, password } = req.body;
        const existingUser = await (0, database_js_1.dbQuery)('SELECT id FROM companies WHERE email = $1', [email]);
        if (existingUser.rowCount && existingUser.rowCount > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const password_hash = await bcryptjs_1.default.hash(password, salt);
        const newUser = await (0, database_js_1.dbQuery)(`INSERT INTO companies (name, gstin, sector, annual_revenue_cr, state, city, email, password_hash)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, name, email, sector, role`, [name, gstin, sector, annual_revenue_cr, state, city, email, password_hash]);
        const user = newUser.rows[0];
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, env_js_1.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ user, token });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error during registration' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await (0, database_js_1.dbQuery)('SELECT * FROM companies WHERE email = $1', [email]);
        if (!result.rowCount || result.rowCount === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const user = result.rows[0];
        const isMatch = await bcryptjs_1.default.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, env_js_1.env.JWT_SECRET, { expiresIn: '1d' });
        const { password_hash, ...userWithoutPassword } = user;
        res.json({ user: userWithoutPassword, token });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error during login' });
    }
};
exports.login = login;
const getMe = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await (0, database_js_1.dbQuery)('SELECT id, name, gstin, sector, annual_revenue_cr, state, city, email, role, created_at FROM companies WHERE id = $1', [userId]);
        if (!result.rowCount || result.rowCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user: result.rows[0] });
    }
    catch (error) {
        console.error('Get Me error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getMe = getMe;
