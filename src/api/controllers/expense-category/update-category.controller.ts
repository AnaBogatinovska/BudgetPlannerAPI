import { Request, Response } from "express";
import errorFeedback from "../../../core/helpers/error-feedback";
import ExpenseCategoryDAL from "../../../data_access_layer/queries/expense-category-dal";

const expenseCategoryDal = new ExpenseCategoryDAL();

export default class UpdateCategoryController {
  public async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      const expenseCategory = {
        userId: req.userData.userId,
        name: req.body.name,
        description: req.body.description,
      };

      await expenseCategoryDal.updateCategory(+req.params.id, expenseCategory);

      res.status(201).json({
        success: true,
        message: "Successfuly updated category",
        data: {
          category: {
            name: req.body.name,
            description: req.body.description ?? "",
          },
        },
      });
    } catch (error) {
      console.log(error);
      const errFeedback = errorFeedback(error);
      res.status(500).json(errFeedback);
    }
  }
}
