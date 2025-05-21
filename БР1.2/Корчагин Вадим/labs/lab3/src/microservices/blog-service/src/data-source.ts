import { DataSource } from "typeorm";
import { BlogPost } from "./entities/BlogPost";
import { BlogComment } from "./entities/BlogComment";
import * as dotenv from "dotenv";
dotenv.config();

export const BlogDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [BlogPost, BlogComment],
  synchronize: false,
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
