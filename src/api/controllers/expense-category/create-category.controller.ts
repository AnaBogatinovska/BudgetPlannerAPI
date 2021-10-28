import { Request, Response } from "express";
import errorFeedback from "../../../core/helpers/error-feedback";
import ExpenseCategoryDAL from "../../../data_access_layer/queries/expense-category-dal";

const expenseCategoryDal = new ExpenseCategoryDAL();

export default class CreateCategoryController {
  public async createCategory(req: Request, res: Response): Promise<void> {
    try {
      console.log("DESC", req.body.description);
      const expenseCategory = {
        userId: req.userData.userId,
        name: req.body.name,
        description: req.body.description,
      };

      await expenseCategoryDal.createCustomCategory(expenseCategory);
      const result = await expenseCategoryDal.getLastInserted();

      res.status(201).json({
        success: true,
        message: "Successfuly created category",
        data: {
          category: {
            id: result.id,
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
