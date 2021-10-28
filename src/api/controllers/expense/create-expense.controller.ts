import { Request, Response } from "express";
import expenseDetailsDAL from "../../../data_access_layer/queries/expense-details-dal";
import { CreateExpenseDetailsDtoModel } from "../../../core/models/expense-details/create-expense-details-dto.model";
import UserMonthPlanDal from "../../../data_access_layer/queries/user-month-plan-dal";
import errorFeedback from "../../../core/helpers/error-feedback";

const userMonthPlanDAL = new UserMonthPlanDal();

export default class CreateExpenseController {
  public async createExpense(req: Request, res: Response): Promise<any> {
    try {
      const userMonthPlan = await userMonthPlanDAL.getUserMonthPlan(
        req.userData.userId,
        Number(req.params.year),
        Number(req.params.month)
      );

      if (userMonthPlan) {
        const userMonthPlanId = userMonthPlan.id;

        const newExpense: CreateExpenseDetailsDtoModel = {
          userMonthPlanId,
          day: req.body.day,
          name: req.body.name,
          amount: req.body.amount,
          categoryId: req.body.categoryId,
        };

        const result = await expenseDetailsDAL.createExpense(newExpense);

        res.status(200).json({
          success: true,
          message: "Expense saved successfuly",
          data: {
            id: result["insertId"],
            year: req.params.year,
            month: req.params.month,
            day: req.body.day,
            name: req.body.name,
            amount: req.body.amount,
            categoryId: req.body.categoryId,
          },
        });
      }
    } catch (error) {
      console.log(error);
      const errFeedback = errorFeedback(error);
      res.status(500).json(errFeedback);
    }
  }
}
