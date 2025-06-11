import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './models/User';
import { CurrentProgress } from './models/CurrentProgress';
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
  entities: [User, CurrentProgress],
  migrations: [],
  subscribers: [],
});