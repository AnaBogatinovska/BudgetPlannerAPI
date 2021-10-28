export default class UserYearPlanDAL {
    getUserYearPlan(userId: number, year: number): Promise<YearPlanModel>;
}
export interface YearPlanModel {
    [k: number]: {
        budget: number;
        balance: number;
    };
}
