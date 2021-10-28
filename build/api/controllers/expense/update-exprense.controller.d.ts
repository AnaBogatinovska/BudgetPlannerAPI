import { Request, Response } from "express";
export default class UpdateExpenseController {
    updateExpense(req: Request, res: Response): Promise<void>;
}
