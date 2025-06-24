import { config } from "dotenv";
import { DataSource } from "typeorm";
import { User } from "./models/User";

config();
export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE as any,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || "5432"),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true, // Для миграций надо поставить false
  logging: process.env.DATABASE_LOGGING === 'true' || false,
  entities: [User],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });