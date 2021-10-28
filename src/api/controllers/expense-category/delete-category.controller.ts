import { Request, Response } from "express";
import errorFeedback from "../../../core/helpers/error-feedback";
import ExpenseCategoryDAL from "../../../data_access_layer/queries/expense-category-dal";

const expenseCategoryDal = new ExpenseCategoryDAL();

export default class DeleteCategoryController {
  public async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      await expenseCategoryDal.deleteExpensesByCategory(+req.params.id);
      await expenseCategoryDal.deleteCategory(+req.params.id);

      res.status(201).json({
        success: true,
        message: "Successfuly deleted category",
      });
    } catch (error) {
      console.log(error);
      const errFeedback = errorFeedback(error);
      res.status(500).json(errFeedback);
    }
  }
}
