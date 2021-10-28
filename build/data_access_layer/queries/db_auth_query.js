"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("../db_config"));
class DbAuthQuery {
    // select user from db users table
    getUser(email) {
        const query = `SELECT * FROM users WHERE email = '${email}';`;
        return db_config_1.default.query(query);
    }
    // add user to db users table
    createUser(user) {
        const query = `INSERT INTO users(name, email, password) VALUES(${user.name}, ${user.email}, ${user.password});`;
        return db_config_1.default.query(query);
    }
}
exports.default = new DbAuthQuery();
