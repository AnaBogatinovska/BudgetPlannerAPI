"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./api/routes/auth.routes"));
const planner_routes_1 = __importDefault(require("./api/routes/planner.routes"));
app.use(cors_1.default());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// api routes
app.use("/auth", auth_routes_1.default);
app.use("/plan", planner_routes_1.default);
module.exports = app;
