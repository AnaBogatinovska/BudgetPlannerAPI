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
const db_month_query_1 = __importDefault(require("../../../data_access_layer/queries/db_month_query"));
class PostMonthPlanController {
    postMonthPlan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqMonthPlan = Object.assign({ userId: req.userData.userId, year: Number(req.params.year), month: Number(req.params.month) }, req.body);
                const monthData = yield db_month_query_1.default.getMonthPlan(req.userData.userId, Number(req.params.year), Number(req.params.month));
                if (!monthData.length) {
                    yield db_month_query_1.default.postMonthPlan(reqMonthPlan);
                    res.status(200).json({
                        success: true,
                        message: "Plan created successfuly!",
                        plan: {
                            income: reqMonthPlan.income,
                            budget: reqMonthPlan.budget,
                        },
                    });
                }
                else {
                    yield db_month_query_1.default.updateMonthPlan(reqMonthPlan);
                    res.status(200).json({
                        success: true,
                        message: "Plan Saved successfuly!",
                        plan: {
                            income: reqMonthPlan.income,
                            budget: reqMonthPlan.budget,
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
exports.default = new PostMonthPlanController();
