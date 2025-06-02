import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './models/User';
import { CurrentProgress } from './models/CurrentProgress';
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
  entities: [User, CurrentProgress], // Только эти две модели
  migrations: [],
  subscribers: [],
});