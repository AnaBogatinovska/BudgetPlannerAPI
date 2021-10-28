import { Request, Response } from "express";
import errorFeedback from "../../../core/helpers/error-feedback";
import ExpenseCategoryDAL from "../../../data_access_layer/queries/expense-category-dal";

const expenseCategoryDal = new ExpenseCategoryDAL();

export default class GetCategoryController {
  public async getCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await expenseCategoryDal.getCategories();
      const categoriesByUser = await expenseCategoryDal.getCategoriesByUser(
        req.userData.userId
      );

      res.status(201).json({
        categories,
        user: categoriesByUser,
      });
    } catch (error) {
      console.log(error);
      const errFeedback = errorFeedback(error);
      res.status(500).json(errFeedback);
    }
  }
}
