import { Request, Response } from "express";
import errorFeedback from "../../../core/helpers/error-feedback";
import UserYearPlanDal from "../../../data_access_layer/queries/user-year-plan-dal";

const userYearPlanDal = new UserYearPlanDal();

export default class UserYearPlanController {
  public async getYearPlan(req: Request, res: Response): Promise<void> {
    try {
      const result = await userYearPlanDal.getUserYearPlan(
        req.userData.userId,
        Number(req.params.year)
      );
        console.log('year: ', result)
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      const errFeedback = errorFeedback(error);
      res.status(500).json(errFeedback);
    }
  }
}
