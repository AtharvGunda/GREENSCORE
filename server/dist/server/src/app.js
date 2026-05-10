"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var env_1 = require("./config/env");
var auth_routes_1 = __importDefault(require("./routes/auth.routes"));
var carbon_routes_1 = __importDefault(require("./routes/carbon.routes"));
var score_routes_1 = __importDefault(require("./routes/score.routes"));
var loans_routes_1 = __importDefault(require("./routes/loans.routes"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
// Root route to prevent "Cannot GET /"
app.get('/', function (req, res) {
    res.status(200).json({
        message: 'Welcome to the GreenScore API!',
        frontend_url: 'http://localhost:5173'
    });
});
// Basic health check
app.get('/health', function (req, res) {
    res.status(200).json({ status: 'ok', environment: env_1.env.NODE_ENV });
});
// Route mounting
app.use('/api/auth', auth_routes_1.default);
app.use('/api/carbon', carbon_routes_1.default);
app.use('/api/score', score_routes_1.default);
app.use('/api/loans', loans_routes_1.default);
app.listen(env_1.env.PORT, function () {
    console.log("Server listening on port ".concat(env_1.env.PORT, " in ").concat(env_1.env.NODE_ENV, " mode"));
});
exports.default = app;
