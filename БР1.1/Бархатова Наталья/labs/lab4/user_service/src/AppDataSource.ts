import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/User";
import { config } from "dotenv";
import { UserDetails } from "./models/UserDetails";

config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, UserDetails],
  migrations: [],
  subscribers: [],
});
