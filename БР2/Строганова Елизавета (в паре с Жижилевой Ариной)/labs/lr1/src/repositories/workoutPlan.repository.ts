import { AppDataSource } from "../database/data-source";
import { WorkoutPlan } from "../entities/WorkoutPlan";

export const workoutPlanRepository = AppDataSource.getRepository(WorkoutPlan);
