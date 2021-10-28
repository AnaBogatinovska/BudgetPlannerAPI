import { Request, Response } from "express";
export default class DeleteExpenseController {
    deleteExpense(req: Request, res: Response): Promise<void>;
}
