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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_auth_query_1 = __importDefault(require("../../data_access_layer/queries/db_auth_query"));
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield db_auth_query_1.default.getUser(req.body.email);
                if (user.length) {
                    return res.status(400).json({
                        success: false,
                        message: "E-mail already exists",
                    });
                }
                else {
                    bcrypt_1.default.hash(req.body.password, 10, (err, hash) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            return res.status(500).json({
                                error: err,
                            });
                        }
                        else {
                            const newUser = {
                                name: req.body.name,
                                email: req.body.email,
                                password: hash,
                            };
                            const result = yield db_auth_query_1.default.createUser(newUser);
                            if (result) {
                                return res.status(200).json({
                                    success: true,
                                    message: "You have successfully signed up! Now you should be able to log in.",
                                });
                            }
                        }
                    }));
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield db_auth_query_1.default.getUser(req.body.email);
                if (!user.length) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid username or password",
                    });
                }
                bcrypt_1.default.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(400).json({
                            success: false,
                            message: "Invalid username or password",
                            error: err,
                        });
                    }
                    if (result) {
                        const token = jsonwebtoken_1.default.sign({
                            email: user[0].email,
                            userId: user[0].id,
                            username: user[0].name,
                        }, "mZlXfDsOqi3", { expiresIn: "24h" });
                        return res.status(200).json({
                            success: true,
                            message: "You have successfully logged in!",
                            token: token,
                            user: {
                                name: user[0].name,
                            },
                        });
                    }
                    else {
                        res.status(400).json({
                            success: false,
                            message: "Incorrect email or password",
                            error: err,
                        });
                    }
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        });
    }
}
exports.default = new AuthController();
