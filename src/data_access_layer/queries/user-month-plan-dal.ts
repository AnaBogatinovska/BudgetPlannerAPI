import { UserMonthPlanEntityModel } from "../../core/models/user-month-plan/user-month-plan-entity.model";
import { CreateUpdateUserMonthPlanDtoModel } from "../../core/models/user-month-plan/create-update-user-month-plan-dto.model";
import db from "../db-config";

export default class UserMonthPlanDAL {
  // get month plan by userId
  public async getUserMonthPlan(
    userId: number,
    year: number,
    month: number
  ): Promise<UserMonthPlanEntityModel | null> {
    const query: string = `select id, year, month, ifnull(income, 0) as income, ifnull(budget, 0) as budget
                                from user_month_plan
                                where userId = ${userId}
                                and year = ${year} 
                                and month = ${month};`;
    const result = await db.query(query);

    if (result.length === 1) {
      return result[0];
    } else {
      return null;
    }
  }

  // create month plan by userId
  public createUserMonthPlan(
    mp: CreateUpdateUserMonthPlanDtoModel
  ): Promise<any> {
    const query: string = `insert into user_month_plan(userId, year, month, income, budget)
        values(${mp.userId},${mp.year},${mp.month},${mp.income},${mp.budget});`;

    return db.query(query);
  }

  // update month plan by userId
  public updateUserMonthPlan(
    mp: CreateUpdateUserMonthPlanDtoModel
  ): Promise<any> {
    const query = `update user_month_plan
      set income = ${mp.income}, budget = ${mp.budget}
      where userId = ${mp.userId}
      and year = ${mp.year}
      and month = ${mp.month};`;

    return db.query(query);
  }
}

