import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/entities/*.{js,ts}"],
  logging: true,
  synchronize: false,
  migrations: ["src/migrations/*.{js,ts}"],
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

export default AppDataSource;
