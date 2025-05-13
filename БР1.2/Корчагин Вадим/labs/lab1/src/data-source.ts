import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
import { User } from "./entities/User";
import { Role } from "./entities/Role";
import { Workout } from "./entities/Workout";
import { TrainingPlan } from "./entities/TrainingPlan";
import { TrainingPlanWorkout } from "./entities/TrainingPlanWorkout";
import { UserTrainingPlan } from "./entities/UserTrainingPlan";
import { UserProgress } from "./entities/UserProgress";
import { BlogPost } from "./entities/BlogPost";
import { BlogComment } from "./entities/BlogComment";
import { Order } from "./entities/Order";
import { Payment } from "./entities/Payment";

dotenv.config();
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: false,
  logging: false,
  entities: [
    User,
    Role,
    Workout,
    TrainingPlan,
    TrainingPlanWorkout,
    UserTrainingPlan,
    UserProgress,
    BlogPost,
    BlogComment,
    Order,
    Payment
  ],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
