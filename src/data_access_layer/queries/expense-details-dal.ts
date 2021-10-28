import { CreateExpenseDetailsDtoModel } from "../../core/models/expense-details/create-expense-details-dto.model";
import { ExpenseDetailsEntityModel } from "../../core/models/expense-details/expense-details-entity.model";
import { UpdateExpenseDetailsDtoModel } from "../../core/models/expense-details/update-expense-details-dto.model";
import db from "../db-config";

class ExpenseDetailsDAL {
  // create expense
  public createExpense(expense: CreateExpenseDetailsDtoModel): Promise<any> {
    const query: string = `insert into expense_details(userMonthPlanId, day, name, amount, categoryId)
    values(${expense.userMonthPlanId}, ${expense.day}, '${expense.name}', ${expense.amount}, ${expense.categoryId});`;
    return db.query(query);
  }

  // get expenses
  public async getExpenses(
    userId: number,
    year: number,
    month: number
  ): Promise<ExpenseDetailsEntityModel[]> {
    const query: string = `select ed.id, ump.year, ump.month, ed.day, ed.name, ed.amount, ed.categoryId
                          from expense_details ed
                          join user_month_plan ump on ump.id = ed.userMonthPlanId
                          where ump.userId = ${userId} 
                          and ump.year = ${year} 
                          and ump.month = ${month};`;

    return await db.query(query);
  }

  // delete expense by id
  public deleteExpense(id: number): Promise<any> {
    const query: string = `delete from expense_details where id = ${id};`;
    return db.query(query);
  }

  // update expense by id
  public updateExpense(expense: UpdateExpenseDetailsDtoModel): Promise<any> {
    const query: string = `update expense_details
                          set day = ${expense.day}, name = '${expense.name}', amount = ${expense.amount}, categoryId = ${expense.categoryId}	
                          where id = ${expense.id};`;
    return db.query(query);
  }
}

export default new ExpenseDetailsDAL();
