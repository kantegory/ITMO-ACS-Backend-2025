import { DataSource } from "typeorm";
import { Order } from "./entities/Order";
import { Payment } from "./entities/Payment";
import * as dotenv from "dotenv";
dotenv.config();

export const OrderDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Order, Payment],
  synchronize: false,
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
