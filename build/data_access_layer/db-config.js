"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mysql_1 = __importDefault(require("mysql"));
const util_1 = __importDefault(require("util"));
const dbConfig = {
    host: "localhost",
    user: "root",
    password: "Badgirl2802!",
    database: "budget_planner_db",
};
const dbConnection = (config) => {
    const connection = mysql_1.default.createConnection(config);
    return {
        query(sql) {
            return util_1.default.promisify(connection.query).call(connection, sql);
        },
        close() {
            return util_1.default.promisify(connection.end).call(connection);
        },
    };
};
module.exports = dbConnection(dbConfig);
