import { AppDataSource } from "../database/data-source";
import { UserWorkoutProgress } from "../entities/UserWorkoutProgress";

export const userWorkoutProgressRepository = AppDataSource.getRepository(UserWorkoutProgress);
