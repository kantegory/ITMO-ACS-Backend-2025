import { BaseService } from "../common/baseService";
import { TrainingPlanWorkout } from "../entities/TrainingPlanWorkout";

export class TrainingPlanWorkoutService extends BaseService<TrainingPlanWorkout> {
  constructor() {
    super(TrainingPlanWorkout);
  }

  async findAllWithRelations() {
    return this.repository.find({ relations: ["training_plan", "workout"] });
  }

  async findOneWithRelations(id: number) {
    return this.repository.findOne({ where: { id }, relations: ["training_plan", "workout"] });
  }
}
