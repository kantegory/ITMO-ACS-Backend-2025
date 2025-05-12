import { BaseService } from "../common/baseService";
import { Workout } from "../entities/Workout";

export class WorkoutService extends BaseService<Workout> {
  constructor() {
    super(Workout);
  }
}
