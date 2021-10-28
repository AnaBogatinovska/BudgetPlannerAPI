import { UserYearPlanModel, YearPlanModel } from "../core/models/user-year-plan/user-year-plan.model";


export default class UserYearPlanDAL {
  public async yearPlan(monthPlans: UserYearPlanModel[]): Promise<YearPlanModel> {
    let yearPlan = emptyYear();

    for (let month in yearPlan) {
      let budget = 0;
      let balance = 0;
      const fp = monthPlans.find((m: any) => m.month == Number(month));
      if (fp) {
        budget = fp.budget;
        balance = fp.balance;
      }

      yearPlan[month] = {
        budget,
        balance: Number(balance),
      };
    }
    return yearPlan;
  }
}

const emptyYear = (): YearPlanModel => {
  return {
    1: { budget: 0, balance: 0 },
    2: { budget: 0, balance: 0 },
    3: { budget: 0, balance: 0 },
    4: { budget: 0, balance: 0 },
    5: { budget: 0, balance: 0 },
    6: { budget: 0, balance: 0 },
    7: { budget: 0, balance: 0 },
    8: { budget: 0, balance: 0 },
    9: { budget: 0, balance: 0 },
    10: { budget: 0, balance: 0 },
    11: { budget: 0, balance: 0 },
    12: { budget: 0, balance: 0 },
  };
};
