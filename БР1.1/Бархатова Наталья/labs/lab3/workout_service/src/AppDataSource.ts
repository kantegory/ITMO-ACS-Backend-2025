import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "dotenv";
import { Progress } from "./models/Progress";
import { TrainingPlan } from "./models/TrainingPlan";
import { Workout } from "./models/Workout";

config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Progress, Workout, TrainingPlan],
  migrations: [],
  subscribers: [],
});
