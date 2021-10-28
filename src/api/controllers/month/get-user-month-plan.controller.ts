import { Request, Response } from "express";
import errorFeedback from "../../../core/helpers/error-feedback";
import expenseDetailsDal from "../../../data_access_layer/queries/expense-details-dal";
import UserMonthPlanDAL from "../../../data_access_layer/queries/user-month-plan-dal";

const userMonthPlanDal = new UserMonthPlanDAL();

export default class GetUserMonthPlanController {
  public async getUserMonthPlan(req: Request, res: Response) {
    try {
      const userMonthPlan = await userMonthPlanDal.getUserMonthPlan(
        req.userData.userId,
        Number(req.params.year),
        Number(req.params.month)
      );

      const expenses = await expenseDetailsDal.getExpenses(
        req.userData.userId,
        Number(req.params.year),
        Number(req.params.month)
      );
      res.status(200).json({
        income: userMonthPlan ? userMonthPlan.income : 0,
        budget: userMonthPlan ? userMonthPlan.budget : 0,
        expenses,
      });
    } catch (error) {
      console.log(error);
      const errFeedback = errorFeedback(error);
      res.status(500).json(errFeedback);
    }
  }
}
