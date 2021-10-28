import { UserYearPlanModel, YearPlanModel } from "../core/models/user-year-plan/user-year-plan.model";
export default class UserYearPlanDAL {
    yearPlan(monthPlans: UserYearPlanModel[]): Promise<YearPlanModel>;
}
