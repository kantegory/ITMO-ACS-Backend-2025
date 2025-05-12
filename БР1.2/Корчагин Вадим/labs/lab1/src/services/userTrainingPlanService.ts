import { BaseService } from "../common/baseService";
import { UserTrainingPlan } from "../entities/UserTrainingPlan";

export class UserTrainingPlanService extends BaseService<UserTrainingPlan> {
  constructor() {
    super(UserTrainingPlan);
  }

  async findAllWithRelations() {
    return this.repository.find({ relations: ["user", "training_plan"] });
  }

  async findOneWithRelations(id: number) {
    return this.repository.findOne({ where: { id }, relations: ["user", "training_plan"] });
  }
}
