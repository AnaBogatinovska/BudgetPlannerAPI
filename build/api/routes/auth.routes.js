"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user/user.controller"));
const router = express_1.Router();
const userController = new user_controller_1.default();
router.post("/signup", userController.register);
router.post("/login", userController.login);
exports.default = router;
