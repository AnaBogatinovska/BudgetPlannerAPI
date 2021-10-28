import db from "../db-config";
import YearPlanLogic from "../../business_logic_layer/year-plan-logic";
import { YearPlanModel } from "../../core/models/user-year-plan/user-year-plan.model";

const yearPlanLogic = new YearPlanLogic();

export default class UserYearPlanDAL {
  public async getUserYearPlan(
    userId: number,
    year: number
  ): Promise<YearPlanModel> {
    const query: string = `select  year,month, ifnull(ump.budget, 0) as budget,
                                ifnull( 
                                (
                                  select ump.budget - ifnull(sum(ed.amount), 0) as sum_expenses
                                  from expense_details ed
                                  where ump.id = ed.userMonthPlanId
                                ), 0)
                                as balance
                                from user_month_plan ump
                                where ump.userId = ${userId}
                                and year = ${year}
                                order by month;`;

    const monthPlans = await db.query(query);
    return await yearPlanLogic.yearPlan(monthPlans);
  }
}
