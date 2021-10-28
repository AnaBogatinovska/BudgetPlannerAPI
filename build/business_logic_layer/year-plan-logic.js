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
Object.defineProperty(exports, "__esModule", { value: true });
class UserYearPlanDAL {
    yearPlan(monthPlans) {
        return __awaiter(this, void 0, void 0, function* () {
            let yearPlan = emptyYear();
            for (let month in yearPlan) {
                let budget = 0;
                let balance = 0;
                const fp = monthPlans.find((m) => m.month == Number(month));
                if (fp) {
                    budget = fp.budget;
                    balance = fp.balance;
                }
                yearPlan[month] = {
                    budget,
                    balance: Number(balance),
                };
            }
            return yearPlan;
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
