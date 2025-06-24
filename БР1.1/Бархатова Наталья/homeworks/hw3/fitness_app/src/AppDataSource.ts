import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/User";
import { Post } from "./models/Post";
import { Progress } from "./models/Progress";
import { TrainingPlan } from "./models/TrainingPlan";
import { UserDetails } from "./models/UserDetails";
import { Workout } from "./models/Workout";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "nata",
  password: "1",
  database: "fitness_app",
  synchronize: true,
  logging: true,
  entities: [
    User,
    Post,
    Progress,
    Workout,
    TrainingPlan,
    UserDetails,
  ],
  migrations: [],
  subscribers: [],
});
