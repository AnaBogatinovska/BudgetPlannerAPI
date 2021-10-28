import { CreateUserDtoModel } from "../../core/models/user/create-user-dto.model";
import { UserEntityModel } from "../../core/models/user/user-entity.model";
export default class UserDAL {
    getUserById(id: number): Promise<UserEntityModel | null>;
    getUserByEmail(email: string): Promise<UserEntityModel | null>;
    createUser(user: CreateUserDtoModel): Promise<any>;
}
