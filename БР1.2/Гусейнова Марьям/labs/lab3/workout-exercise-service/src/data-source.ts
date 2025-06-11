import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Workout } from './models/Workout';
import { Exercise } from './models/Exercise';
import { ExerciseWorkout } from './models/ExerciseWorkout';
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
  entities: [Workout, Exercise, ExerciseWorkout],
  migrations: [],
  subscribers: [],
});