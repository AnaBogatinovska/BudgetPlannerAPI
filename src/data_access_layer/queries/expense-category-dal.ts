import { ExpenseCategoryDtoModel } from "../../core/models/expense-category/expense-category-dto.model";
import db from "../db-config";

export default class ExpenseCategoryDAL {
  public async createCustomCategory(
    category: ExpenseCategoryDtoModel
  ): Promise<any> {
    const query = `insert into expense_category(userId, name, description) 
                    values(${category.userId ? category.userId : ""}, '${
      category.name
    }', '${category.description}');`;

    return await db.query(query);
  }

  public async getCategories(): Promise<any> {
    const query = `select id, name, ifnull(description, '') as description from expense_category where userId is null;`;

    return await db.query(query);
  }

  public async getCategoriesByUser(userId: number): Promise<any> {
    const query = `select id, name, ifnull(description, '') as description from expense_category where userId = ${userId};`;

    return await db.query(query);
  }

  public async updateCategory(
    id: number,
    category: ExpenseCategoryDtoModel
  ): Promise<any> {
    const query = `update expense_category set name = '${category.name}', description = '${category.description}' where id = ${id};`;

    return await db.query(query);
  }

  public async deleteCategory(id: number): Promise<any> {
    const query = `delete from expense_category where id = ${id};`;

    return await db.query(query);
  }
  public async deleteExpensesByCategory(id: number): Promise<any> {
    const query = `delete from expense_details where categoryId = ${id};`;

    return await db.query(query);
  }

  public async getLastInserted(): Promise<any> {
    const query = `SELECT * FROM expense_category ORDER BY id DESC LIMIT 1;`;

    return await db.query(query);
  }
}
