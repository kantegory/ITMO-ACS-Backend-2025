import "reflect-metadata";
import { DataSource } from "typeorm";
import { WorkoutPlan } from "../entities/WorkoutPlan";
import { Workout } from "../entities/Workout";
import { UserWorkoutProgress } from "../entities/UserWorkoutProgress";


export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // Для разработки, в продакшене используйте миграции
  logging: false,
  entities: [WorkoutPlan, Workout, UserWorkoutProgress],
  migrations: [],
  subscribers: [],
});