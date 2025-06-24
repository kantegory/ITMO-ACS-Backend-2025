import { DataSource } from 'typeorm'
import { Category } from './models/Category'
import { Channel } from './models/Channel'
import { Review } from './models/Review'
import { Role } from './models/Role'
import { Theme } from './models/Theme'
import { User } from './models/User'
import { Video } from './models/Video'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: 'qwerty',
  database: 'db',
  synchronize: true,
  logging: true,
  entities: [
    Category,
    Channel,
    Review,
    Role,
    Theme,
    User,
    Video,
  ],
  migrations: [],
  subscribers: [],
})