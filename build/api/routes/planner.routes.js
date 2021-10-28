"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const check_auth_1 = __importDefault(require("../../core/middleware/check-auth"));
const get_user_month_plan_controller_1 = __importDefault(require("../controllers/month/get-user-month-plan.controller"));
const create_update_user_month_plan_controller_1 = __importDefault(require("../controllers/month/create-update-user-month-plan.controller"));
const create_expense_controller_1 = __importDefault(require("../controllers/expense/create-expense.controller"));
const delete_expense_controller_1 = __importDefault(require("../controllers/expense/delete-expense.controller"));
const update_exprense_controller_1 = __importDefault(require("../controllers/expense/update-exprense.controller"));
const get_user_year_plan_controller_1 = __importDefault(require("../controllers/year/get-user-year-plan.controller"));
const router = express_1.Router();
const userYearPlanController = new get_user_year_plan_controller_1.default();
const getUserMonthPlanController = new get_user_month_plan_controller_1.default();
const createUpdateUserMonthPlanController = new create_update_user_month_plan_controller_1.default();
const createExpenseController = new create_expense_controller_1.default();
const deleteExpenseController = new delete_expense_controller_1.default();
const updateExpenseController = new update_exprense_controller_1.default();
// year 
router.get("/:year", check_auth_1.default, userYearPlanController.getYearPlan);
// month
router.get("/:year/:month", check_auth_1.default, getUserMonthPlanController.getUserMonthPlan);
router.post("/:year/:month", check_auth_1.default, createUpdateUserMonthPlanController.createUpdateUserMonthPlan);
// expenses
router.post("/:year/:month/expense", check_auth_1.default, createExpenseController.createExpense);
router.delete("/expense/:expenseId", check_auth_1.default, deleteExpenseController.deleteExpense);
router.put("/expense/:expenseId/edit", check_auth_1.default, updateExpenseController.updateExpense);
exports.default = router;
