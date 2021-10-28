import { Request, Response } from "express";
export default class CreateExpenseController {
    createExpense(req: Request, res: Response): Promise<any>;
}
