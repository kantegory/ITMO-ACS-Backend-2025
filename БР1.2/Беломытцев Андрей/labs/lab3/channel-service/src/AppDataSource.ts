import { DataSource } from 'typeorm'
import { Category } from './models/Category'
import { Channel } from './models/Channel'
import { Review } from './models/Review'
import { Theme } from './models/Theme'
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
    Category,
    Channel,
    Review,
    Theme,
  ],
  migrations: [],
  subscribers: [],
})