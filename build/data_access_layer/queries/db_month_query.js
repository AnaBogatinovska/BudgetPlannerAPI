"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("../db_config"));
class DbMonthQuery {
    // get month plan by userId
    getMonthPlan(userId, year, month) {
        const query = `select id, year, month, ifnull(income, 0) as income, ifnull(budget, 0) as budget
                                from user_month_plan
                                where userId = ${userId}
                                and year = ${year} 
                                and month = ${month};`;
        return db_config_1.default.query(query);
    }
    // create month plan by userId
    postMonthPlan(mp) {
        const query = `insert into user_month_plan(userId, year, month, income, budget)
        values(${mp.userId},${mp.year},${mp.month},${mp.income},${mp.budget});`;
        return db_config_1.default.query(query);
    }
    // update month plan by userId
    updateMonthPlan(mp) {
        const query = `update user_month_plan
      set income = ${mp.income}, budget = ${mp.budget}
      where userId = ${mp.userId}
      and year = ${mp.year}
      and month = ${mp.month};`;
        return db_config_1.default.query(query);
    }
}
exports.default = new DbMonthQuery();
