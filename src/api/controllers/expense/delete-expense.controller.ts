import { Request, Response } from "express";
import errorFeedback from "../../../core/helpers/error-feedback";
import expenseDetailsDal from "../../../data_access_layer/queries/expense-details-dal";

export default class DeleteExpenseController {
  public async deleteExpense(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.expenseId);
      await expenseDetailsDal.deleteExpense(id);
      res.status(200).json({
        success: true,
        message: "Expense deleted successfully.",
        data: {
          expense: id,
        },
      });
    } catch (error) {
      console.log(error);
      const errFeedback = errorFeedback(error);
      res.status(500).json(errFeedback);
    }
  }
}
