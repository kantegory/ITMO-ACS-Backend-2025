import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { BlogPost } from "../entities/BlogPost";
import { UserMeasurementsProgress } from "../entities/UserMeasurementsProgress";
import { WorkoutPlan } from "../entities/WorkoutPlan";
import { Workout } from "../entities/Workout";
import { UserWorkoutProgress } from "../entities/UserWorkoutProgress";
import { PostComment} from "../entities/PostComment";
import { PostLike} from "../entities/PostLike";
import { PostTag} from "../entities/PostTag";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres", // поменяй под свою БД
  password: "admin",
  database: "fitness_app",
  synchronize: true,  // на разработке ок, потом лучше через миграции
  logging: false,
  entities: [User, BlogPost, UserMeasurementsProgress, WorkoutPlan, Workout, UserWorkoutProgress, PostComment, PostTag, PostLike],
  migrations: [],
  subscribers: [],
});
