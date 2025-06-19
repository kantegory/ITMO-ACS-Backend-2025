import "reflect-metadata";
import { DataSource } from "typeorm";
import { BlogPost } from "../entities/BlogPost";
import { PostComment} from "../entities/PostComment";
import { PostLike} from "../entities/PostLike";
import { PostTag} from "../entities/PostTag";


export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // Для разработки, в продакшене используйте миграции
  logging: false,
  entities: [BlogPost, PostTag, PostLike, PostComment],
  migrations: [],
  subscribers: [],
});