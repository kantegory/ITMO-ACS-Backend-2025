import { DataSource } from "typeorm";
import { User } from "./entity/user";
import { Role } from "./entity/role";
import { Resume } from "./entity/resume";
import { Education } from "./entity/education";
import { Experience } from "./entity/experience";
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "microservices_db",
  synchronize: true,
  logging: false,
  entities: [User, Role, Resume, Education, Experience],
  migrations: [__dirname + "/migration/**/*.js"],
  subscribers: [],
});
