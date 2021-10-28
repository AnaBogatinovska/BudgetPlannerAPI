import { CreateExpenseDetailsDtoModel } from "../../core/models/expense-details/create-expense-details-dto.model";
import { ExpenseDetailsEntityModel } from "../../core/models/expense-details/expense-details-entity.model";
import { UpdateExpenseDetailsDtoModel } from "../../core/models/expense-details/update-expense-details-dto.model";
declare class ExpenseDetailsDAL {
    createExpense(expense: CreateExpenseDetailsDtoModel): Promise<any>;
    getExpenses(userId: number, year: number, month: number): Promise<ExpenseDetailsEntityModel[]>;
    deleteExpense(id: number): Promise<any>;
    updateExpense(expense: UpdateExpenseDetailsDtoModel): Promise<any>;
    getLastInsertedId(): Promise<any>;
}
declare const _default: ExpenseDetailsDAL;
export default _default;
