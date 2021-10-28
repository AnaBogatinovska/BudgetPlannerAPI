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
class ExpenseDetailsDAL {
    // create expense
    createExpense(expense) {
        const query = `insert into expense_details(userMonthPlanId, day, name, amount, categoryId)
    values(${expense.userMonthPlanId}, ${expense.day}, '${expense.name}', ${expense.amount}, ${expense.categoryId});`;
        return db_config_1.default.query(query);
    }
    // get expenses
    getExpenses(userId, year, month) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `select ed.id, ump.year, ump.month, ed.day, ed.name, ed.amount, ed.categoryId
                          from expense_details ed
                          join user_month_plan ump on ump.id = ed.userMonthPlanId
                          where ump.userId = ${userId} 
                          and ump.year = ${year} 
                          and ump.month = ${month};`;
            return yield db_config_1.default.query(query);
        });
    }
    // delete expense by id
    deleteExpense(id) {
        const query = `delete from expense_details where id = ${id};`;
        return db_config_1.default.query(query);
    }
    // update expense by id
    updateExpense(expense) {
        const query = `update expense_details
                          set day = ${expense.day}, name = '${expense.name}', amount = ${expense.amount}, categoryId = ${expense.categoryId}	
                          where id = ${expense.id};`;
        return db_config_1.default.query(query);
    }
    // select last insert id
    getLastInsertedId() {
        const query = `SELECT LAST_INSERT_ID() AS id;`;
        return db_config_1.default.query(query);
    }
}
exports.default = new ExpenseDetailsDAL();
