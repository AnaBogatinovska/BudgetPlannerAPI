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
const year_plan_logic_1 = __importDefault(require("../../business_logic_layer/year-plan-logic"));
const yearPlanLogic = new year_plan_logic_1.default();
class UserYearPlanDAL {
    getUserYearPlan(userId, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `select year,month, ifnull(ump.budget, 0) as budget, 
                                (
                                    ifnull(ump.budget - 
                                    (
                                        select ifnull(sum(ed.amount), 0) as sum_expenses
                                        from expense_details ed
                                        join user_month_plan ump on ump.id = ed.userMonthPlanId
                                    ), 0)
                                ) as balance
                                from user_month_plan ump
                                where ump.userId = ${userId}
                                and year = ${year}
                                order by month;`;
            const monthPlans = yield db_config_1.default.query(query);
            return yield yearPlanLogic.yearPlan(monthPlans);
        });
    }
}
exports.default = UserYearPlanDAL;
const emptyYear = () => {
    return {
        1: { budget: 0, balance: 0 },
        2: { budget: 0, balance: 0 },
        3: { budget: 0, balance: 0 },
        4: { budget: 0, balance: 0 },
        5: { budget: 0, balance: 0 },
        6: { budget: 0, balance: 0 },
        7: { budget: 0, balance: 0 },
        8: { budget: 0, balance: 0 },
        9: { budget: 0, balance: 0 },
        10: { budget: 0, balance: 0 },
        11: { budget: 0, balance: 0 },
        12: { budget: 0, balance: 0 },
    };
};
