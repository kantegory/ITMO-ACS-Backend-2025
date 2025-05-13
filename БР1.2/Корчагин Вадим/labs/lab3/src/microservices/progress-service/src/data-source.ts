import { DataSource } from "typeorm";
import { UserProgress } from "./entities/UserProgress";
import { UserTrainingPlan } from "./entities/UserTrainingPlan";
import * as dotenv from "dotenv";
dotenv.config();

export const ProgressDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UserProgress, UserTrainingPlan],
  synchronize: false,
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
