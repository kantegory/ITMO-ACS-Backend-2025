import { DataSource } from "typeorm";
import { Workout } from "./entities/Workout";
import { TrainingPlan } from "./entities/TrainingPlan";
import { TrainingPlanWorkout } from "./entities/TrainingPlanWorkout";
import * as dotenv from "dotenv";
dotenv.config();

export const WorkoutDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Workout, TrainingPlan, TrainingPlanWorkout],
  synchronize: false,
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
