import { DataSource } from 'typeorm'
import { Role } from './models/Role'
import { User } from './models/User'
import config from './config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [
    Role,
    User,
  ],
  migrations: [],
  subscribers: [],
})