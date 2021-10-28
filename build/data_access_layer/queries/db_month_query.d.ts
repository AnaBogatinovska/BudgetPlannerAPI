import { MonthPlan } from "../../api/models/month/month_plan.model";
import { PostMonthPlan } from "../../api/models/month/post_month_plan.model";
declare class DbMonthQuery {
    getMonthPlan(userId: number, year: number, month: number): Promise<MonthPlan[]>;
    postMonthPlan(mp: PostMonthPlan): Promise<any>;
    updateMonthPlan(mp: PostMonthPlan): Promise<any>;
}
declare const _default: DbMonthQuery;
export default _default;
