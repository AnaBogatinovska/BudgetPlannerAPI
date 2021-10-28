import { Request, Response } from "express";
import errorFeedback from "../../../core/helpers/error-feedback";
import { UpdateExpenseDetailsDtoModel } from "../../../core/models/expense-details/update-expense-details-dto.model";
import { ResponseStatusModel } from "../../../core/models/response-status.model";
import expenseDetailsDal from "../../../data_access_layer/queries/expense-details-dal";

export default class UpdateExpenseController {
  public async updateExpense(req: Request, res: Response): Promise<void> {
    try {
      const expenseUpdated: UpdateExpenseDetailsDtoModel = {
        id: Number(req.params.expenseId),
        day: req.body.day,
        name: req.body.name,
        amount: req.body.amount,
        categoryId: req.body.categoryId,
      };
      await expenseDetailsDal.updateExpense(expenseUpdated);

      res.status(200).json({
        success: true,
        message: "Expense updated successfully.",
        data: {
          id: expenseUpdated.id,
          year: req.params.year,
          month: req.params.month,
          day: expenseUpdated.day,
          name: expenseUpdated.name,
          amount: expenseUpdated.amount,
          categoryId: expenseUpdated.categoryId,
        },
      } as ResponseStatusModel);
    } catch (error) {
      console.log(error);
      const errFeedback = errorFeedback(error);
      res.status(500).json(errFeedback);
    }
  }
}
