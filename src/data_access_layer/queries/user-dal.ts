import { CreateUserDtoModel } from "../../core/models/user/create-user-dto.model";
import { UserEntityModel } from "../../core/models/user/user-entity.model";
import db from "../db-config";

export default class UserDAL {
  // select user from db users table
  public async getUserById(id: number): Promise<UserEntityModel | null> {
    const query = `SELECT * FROM users WHERE id = ${id};`;
    const result = await db.query(query);

    if (result.length === 1) {
      return result[0];
    } else {
      return null;
    }
  }
  public async getUserByEmail(email: string): Promise<UserEntityModel | null> {
    const query = `SELECT * FROM users WHERE email = '${email}';`;
    const result = await db.query(query);

    if (result.length === 1) {
      return result[0];
    } else {
      return null;
    }
  }

  // add user to db users table
  public async createUser(user: CreateUserDtoModel): Promise<any> {
    const ifUserExists = await this.getUserByEmail(user.email);
    if (ifUserExists) {
      throw new Error("This user already exists");
    }
    const query = `INSERT INTO users(name, email, password) VALUES('${user.name}', '${user.email}', '${user.password}');`;
    return db.query(query);
  }
}
