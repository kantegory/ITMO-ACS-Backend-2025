import { AppDataSource } from "../database/data-source";
import { UserMeasurementsProgress } from "../entities/UserMeasurementsProgress";

export const userMeasurementsProgressRepository = AppDataSource.getRepository(UserMeasurementsProgress);
