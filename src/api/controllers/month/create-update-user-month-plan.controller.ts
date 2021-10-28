import * as express from "express";
import errorFeedback from "../../../core/helpers/error-feedback";
import { CreateUpdateUserMonthPlanDtoModel } from "../../../core/models/user-month-plan/create-update-user-month-plan-dto.model";
import UserMonthPlanDal from "../../../data_access_layer/queries/user-month-plan-dal";

const userMonthPlanDAL = new UserMonthPlanDal();

export default class CreateUpdateUserMonthPlanController {
  public async createUpdateUserMonthPlan(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const reqMonthPlan: CreateUpdateUserMonthPlanDtoModel = {
        userId: req.userData.userId,
        year: Number(req.params.year),
        month: Number(req.params.month),
        ...req.body,
      };

      const monthData = await userMonthPlanDAL.getUserMonthPlan(
        req.userData.userId,
        Number(req.params.year),
        Number(req.params.month)
      );

      if (!monthData) {
        await userMonthPlanDAL.createUserMonthPlan(reqMonthPlan);
        res.status(200).json({
          success: true,
          message: "Plan created successfuly!",
          data: {
            income: reqMonthPlan.income,
            budget: reqMonthPlan.budget,
          },
        });
      } else {
        await userMonthPlanDAL.updateUserMonthPlan(reqMonthPlan);
        res.status(200).json({
          success: true,
          message: "Plan updated successfuly!",
          data: {
            income: reqMonthPlan.income,
            budget: reqMonthPlan.budget,
          },
        });
      }
    } catch (error) {
      const errFeedback = errorFeedback(error);
      res.status(500).json(errFeedback);
    }
  }
}
