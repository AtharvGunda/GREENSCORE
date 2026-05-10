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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.register = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var database_1 = require("../config/database");
var env_1 = require("../config/env");
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, gstin, sector, annual_revenue_cr, state, city, email, password, existingUser, salt, password_hash, newUser, user, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, name_1 = _a.name, gstin = _a.gstin, sector = _a.sector, annual_revenue_cr = _a.annual_revenue_cr, state = _a.state, city = _a.city, email = _a.email, password = _a.password;
                return [4 /*yield*/, (0, database_1.dbQuery)('SELECT id FROM companies WHERE email = $1', [email])];
            case 1:
                existingUser = _b.sent();
                if (existingUser.rowCount && existingUser.rowCount > 0) {
                    return [2 /*return*/, res.status(400).json({ error: 'Email already exists' })];
                }
                return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
            case 2:
                salt = _b.sent();
                return [4 /*yield*/, bcryptjs_1.default.hash(password, salt)];
            case 3:
                password_hash = _b.sent();
                return [4 /*yield*/, (0, database_1.dbQuery)("INSERT INTO companies (name, gstin, sector, annual_revenue_cr, state, city, email, password_hash)\n       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, name, email, sector, role", [name_1, gstin, sector, annual_revenue_cr, state, city, email, password_hash])];
            case 4:
                newUser = _b.sent();
                user = newUser.rows[0];
                token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, env_1.env.JWT_SECRET, { expiresIn: '1d' });
                res.status(201).json({ user: user, token: token });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                console.error('Registration error:', error_1);
                res.status(500).json({ error: 'Server error during registration' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, result, user, isMatch, token, password_hash, userWithoutPassword, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, (0, database_1.dbQuery)('SELECT * FROM companies WHERE email = $1', [email])];
            case 1:
                result = _b.sent();
                if (!result.rowCount || result.rowCount === 0) {
                    return [2 /*return*/, res.status(401).json({ error: 'Invalid credentials' })];
                }
                user = result.rows[0];
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password_hash)];
            case 2:
                isMatch = _b.sent();
                if (!isMatch) {
                    return [2 /*return*/, res.status(401).json({ error: 'Invalid credentials' })];
                }
                token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, env_1.env.JWT_SECRET, { expiresIn: '1d' });
                password_hash = user.password_hash, userWithoutPassword = __rest(user, ["password_hash"]);
                res.json({ user: userWithoutPassword, token: token });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.error('Login error:', error_2);
                res.status(500).json({ error: 'Server error during login' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var getMe = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.user.id;
                return [4 /*yield*/, (0, database_1.dbQuery)('SELECT id, name, gstin, sector, annual_revenue_cr, state, city, email, role, created_at FROM companies WHERE id = $1', [userId])];
            case 1:
                result = _a.sent();
                if (!result.rowCount || result.rowCount === 0) {
                    return [2 /*return*/, res.status(404).json({ error: 'User not found' })];
                }
                res.json({ user: result.rows[0] });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error('Get Me error:', error_3);
                res.status(500).json({ error: 'Server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getMe = getMe;
