"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).end();
    }
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, "mZlXfDsOqi3");
        req.userData = decoded;
        return next();
    }
    catch (error) {
        res.status(401).json({
            message: "Authorization failed !",
        });
    }
};
