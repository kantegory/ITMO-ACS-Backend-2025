import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/User";
import { BlogPost } from "./models/BlogPost";
import { UserMeasurementsProgress } from "./models/UserMeasurementsProgress";
import { WorkoutPlan } from "./models/WorkoutPlan";
import { Workout } from "./models/Workout";
import { UserWorkoutProgress } from "./models/UserWorkoutProgress";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Arina2992",
  database: "fitness_app",
  synchronize: true,  // на разработке ок, потом лучше через миграции
  logging: false,
  entities: [User, BlogPost, UserMeasurementsProgress, WorkoutPlan, Workout, UserWorkoutProgress],
  migrations: [],
  subscribers: [],
});
