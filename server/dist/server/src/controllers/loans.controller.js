"use strict";
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
exports.getLoanById = exports.getEligibleLoans = exports.listLoans = void 0;
var database_1 = require("../config/database");
var listLoans = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loans, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, database_1.dbQuery)('SELECT * FROM loan_offers WHERE is_active = TRUE')];
            case 1:
                loans = _a.sent();
                res.json(loans.rows);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ error: 'Server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.listLoans = listLoans;
var getEligibleLoans = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, scoreRes, score, companyRes, sector, query, loans, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                userId = req.user.id;
                return [4 /*yield*/, (0, database_1.dbQuery)('SELECT total_score FROM green_scores WHERE company_id = $1 ORDER BY calculated_at DESC LIMIT 1', [userId])];
            case 1:
                scoreRes = _a.sent();
                if (!scoreRes.rowCount)
                    return [2 /*return*/, res.json([])];
                score = scoreRes.rows[0].total_score;
                return [4 /*yield*/, (0, database_1.dbQuery)('SELECT sector FROM companies WHERE id = $1', [userId])];
            case 2:
                companyRes = _a.sent();
                sector = companyRes.rows[0].sector;
                query = "\n      SELECT * FROM loan_offers \n      WHERE is_active = TRUE \n      AND min_score <= $1 \n      AND (eligible_sectors IS NULL OR $2 = ANY(eligible_sectors))\n    ";
                return [4 /*yield*/, (0, database_1.dbQuery)(query, [score, sector])];
            case 3:
                loans = _a.sent();
                res.json(loans.rows);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                res.status(500).json({ error: 'Server error' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getEligibleLoans = getEligibleLoans;
var getLoanById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, loan, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, (0, database_1.dbQuery)('SELECT * FROM loan_offers WHERE id = $1', [id])];
            case 1:
                loan = _a.sent();
                if (!loan.rowCount)
                    return [2 /*return*/, res.status(404).json({ error: 'Loan not found' })];
                res.json(loan.rows[0]);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500).json({ error: 'Server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getLoanById = getLoanById;
