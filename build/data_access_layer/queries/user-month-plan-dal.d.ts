import { UserMonthPlanEntityModel } from "../../core/models/user-month-plan/user-month-plan-entity.model";
import { CreateUpdateUserMonthPlanDtoModel } from "../../core/models/user-month-plan/create-update-user-month-plan-dto.model";
declare class UserMonthPlanDAL {
    getUserMonthPlan(userId: number, year: number, month: number): Promise<UserMonthPlanEntityModel | null>;
    createUserMonthPlan(mp: CreateUpdateUserMonthPlanDtoModel): Promise<any>;
    updateUserMonthPlan(mp: CreateUpdateUserMonthPlanDtoModel): Promise<any>;
}
declare const _default: UserMonthPlanDAL;
export default _default;
