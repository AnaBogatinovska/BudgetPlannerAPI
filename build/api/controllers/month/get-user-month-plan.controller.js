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
const expense_details_dal_1 = __importDefault(require("../../../data_access_layer/queries/expense-details-dal"));
const user_month_plan_dal_1 = __importDefault(require("../../../data_access_layer/queries/user-month-plan-dal"));
class GetUserMonthPlanController {
    getUserMonthPlan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userMonthPlan = yield user_month_plan_dal_1.default.getUserMonthPlan(req.userData.userId, Number(req.params.year), Number(req.params.month));
                if (userMonthPlan) {
                    const expenses = yield expense_details_dal_1.default.getExpenses(req.userData.userId, Number(req.params.year), Number(req.params.month));
                    res.status(200).json({
                        income: userMonthPlan.income,
                        budget: userMonthPlan.budget,
                        expenses,
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
exports.default = GetUserMonthPlanController;
