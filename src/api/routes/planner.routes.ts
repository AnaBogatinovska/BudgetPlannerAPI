import { Router } from "express";

import checkAuth from "../../core/middleware/check-auth";
import GetUserMonthPlanController from "../controllers/month/get-user-month-plan.controller";
import CreateUpdateUserMonthPlanController from "../controllers/month/create-update-user-month-plan.controller";
import CreateExpenseController from "../controllers/expense/create-expense.controller";
import DeleteExpenseController from "../controllers/expense/delete-expense.controller";
import UpdateExpenseController from "../controllers/expense/update-exprense.controller";
import GetUserYearPlanController from "../controllers/year/get-user-year-plan.controller";
import CreateCategoryController from "../controllers/expense-category/create-category.controller";
import GetCategoryController from "../controllers/expense-category/get-categories.controller";
import UpdateCategoryController from "../controllers/expense-category/update-category.controller";
import DeleteCategoryController from "../controllers/expense-category/delete-category.controller";

const router: Router = Router();

const userYearPlanController = new GetUserYearPlanController();

const getUserMonthPlanController = new GetUserMonthPlanController();
const createUpdateUserMonthPlanController = new CreateUpdateUserMonthPlanController();

const createExpenseController = new CreateExpenseController();
const deleteExpenseController = new DeleteExpenseController();
const updateExpenseController = new UpdateExpenseController();

const createCategoryController = new CreateCategoryController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();
const getCategoryController = new GetCategoryController

// category
router.get("/category", checkAuth, getCategoryController.getCategories);
router.post("/category/create", checkAuth, createCategoryController.createCategory);
router.post("/category/:id/edit", checkAuth, updateCategoryController.updateCategory);
router.delete("/category/:id/delete", checkAuth, deleteCategoryController.deleteCategory);

// year 
router.get("/:year", checkAuth , userYearPlanController.getYearPlan);

// month
router.get("/:year/:month", checkAuth, getUserMonthPlanController.getUserMonthPlan);
router.post("/:year/:month", checkAuth, createUpdateUserMonthPlanController.createUpdateUserMonthPlan);

// expenses
router.post("/:year/:month/expense", checkAuth , createExpenseController.createExpense);
router.delete("/expense/:expenseId", checkAuth , deleteExpenseController.deleteExpense);
router.put("/expense/:expenseId/edit", checkAuth , updateExpenseController.updateExpense);


export default router;
