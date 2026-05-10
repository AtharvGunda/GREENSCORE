"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbQuery = exports.pool = void 0;
const pg_1 = require("pg");
const env_js_1 = require("./env.js");
exports.pool = new pg_1.Pool({
    connectionString: env_js_1.env.DATABASE_URL,
});
const dbQuery = async (text, params) => {
    const start = Date.now();
    const res = await exports.pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    return res;
};
exports.dbQuery = dbQuery;
