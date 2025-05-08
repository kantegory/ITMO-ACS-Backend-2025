import { AppDataSource } from "../database/data-source";
import { Workout } from "../entities/Workout";

export const workoutRepository = AppDataSource.getRepository(Workout);
