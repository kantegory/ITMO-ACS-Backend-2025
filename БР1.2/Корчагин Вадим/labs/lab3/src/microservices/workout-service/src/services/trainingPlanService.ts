import { BaseService } from "../common/baseService";
import { TrainingPlan } from "../entities/TrainingPlan";

export class TrainingPlanService extends BaseService<TrainingPlan> {
  constructor() {
    super(TrainingPlan);
  }
}