import { CreateUser } from "../../api/models/user/create_user.model";
import { User } from "../../api/models/user/user.model";
declare class DbAuthQuery {
    getUser(email: string): Promise<User[]>;
    createUser(user: CreateUser): Promise<any>;
}
declare const _default: DbAuthQuery;
export default _default;
