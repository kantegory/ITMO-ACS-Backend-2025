import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Workout } from './models/Workout';
import { Exercise } from './models/Exercise';
import { ExerciseWorkout } from './models/ExerciseWorkout';
import { config } from 'dotenv';

config(); // Загружаем переменные из .env

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [Workout, Exercise, ExerciseWorkout],
  migrations: [],
  subscribers: [],
});