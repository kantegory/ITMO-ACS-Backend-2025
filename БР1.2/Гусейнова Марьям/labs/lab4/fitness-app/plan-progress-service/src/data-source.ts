import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { WorkoutPlan } from './models/WorkoutPlan';
import { PlanProgress } from './models/PlanProgress';
import { ExerciseProgress } from './models/ExerciseProgress';
import { WorkoutInPlan } from './models/WorkoutInPlan';
import appConfig from './config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: appConfig.db.host,
  port: appConfig.db.port,
  username: appConfig.db.username,
  password: appConfig.db.password,
  database: appConfig.db.database,
  synchronize: true,
  logging: false,
  entities: [WorkoutPlan, PlanProgress, ExerciseProgress, WorkoutInPlan],
  migrations: [],
  subscribers: [],
});