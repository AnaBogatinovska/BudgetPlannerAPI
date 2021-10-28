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
const db_config_1 = __importDefault(require("../db-config"));
class UserDAL {
    // select user from db users table
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM users WHERE id = ${id};`;
            const result = yield db_config_1.default.query(query);
            if (result.length === 1) {
                return result[0];
            }
            else {
                return null;
            }
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM users WHERE email = '${email}';`;
            console.log(query);
            const result = yield db_config_1.default.query(query);
            console.log(result);
            if (result.length === 1) {
                return result[0];
            }
            else {
                return null;
            }
        });
    }
    // add user to db users table
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const ifUserExists = yield this.getUserByEmail(user.email);
            if (ifUserExists) {
                throw new Error("This user already exists");
            }
            const query = `INSERT INTO users(name, email, password) VALUES('${user.name}', '${user.email}', '${user.password}');`;
            return db_config_1.default.query(query);
        });
    }
}
exports.default = UserDAL;
