"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const auth_routes_js_1 = __importDefault(require("./routes/auth.routes.js"));
const carbon_routes_js_1 = __importDefault(require("./routes/carbon.routes.js"));
const score_routes_js_1 = __importDefault(require("./routes/score.routes.js"));
const loans_routes_js_1 = __importDefault(require("./routes/loans.routes.js"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
// Basic health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', environment: env.NODE_ENV });
});
// Route mounting
app.use('/api/auth', auth_routes_js_1.default);
app.use('/api/carbon', carbon_routes_js_1.default);
app.use('/api/score', score_routes_js_1.default);
app.use('/api/loans', loans_routes_js_1.default);
app.listen(env.PORT, () => {
    console.log(`Server listening on port ${env.PORT} in ${env.NODE_ENV} mode`);
});
exports.default = app;
