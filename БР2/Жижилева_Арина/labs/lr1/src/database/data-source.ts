import "reflect-metadata";
import { DataSource } from 'typeorm';
import { User } from "../entities/User";
import { BlogPost } from "../entities/BlogPost";
import { UserMeasurementsProgress } from "../entities/UserMeasurementsProgress";
import { WorkoutPlan } from "../entities/WorkoutPlan";
import { Workout } from "../entities/Workout";
import { UserWorkoutProgress } from "../entities/UserWorkoutProgress";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Arina2992",
  database: "fitness_app",
  synchronize: true,
  logging: false,
  entities: [User, BlogPost, UserMeasurementsProgress, WorkoutPlan, Workout, UserWorkoutProgress],
  migrations: [],
  subscribers: [],
});
