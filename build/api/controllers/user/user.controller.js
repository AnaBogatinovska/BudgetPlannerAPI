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
const encryptor_1 = __importDefault(require("../../../core/helpers/encryptor"));
const user_dal_1 = __importDefault(require("../../../data_access_layer/queries/user-dal"));
const encryptor = new encryptor_1.default();
const userDAL = new user_dal_1.default();
class UserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = {
                    name: req.body.name,
                    email: req.body.email,
                    password: yield encryptor.encrypt(req.body.password),
                };
                yield userDAL.createUser(newUser);
                return res.status(200).json({
                    success: true,
                    message: "You have successfully signed up! Now you should be able to log in.",
                });
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json(error.message);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userDAL.getUserByEmail(req.body.email);
                console.log(user);
                if (!user) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid username or password",
                    });
                }
                const isPasswordMatched = yield encryptor.compare(user.password, req.body.password);
                if (isPasswordMatched) {
                    const token = jsonwebtoken_1.default.sign({
                        email: user.email,
                        userId: user.id,
                        username: user.name,
                    }, "mZlXfDsOqi3", { expiresIn: "24h" });
                    return res.status(200).json({
                        success: true,
                        message: "You have successfully logged in!",
                        token: token,
                        user: {
                            name: user.name,
                        },
                    });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        });
    }
}
exports.default = UserController;
