import { DataSource } from "typeorm";
import SETTINGS from "../config/settings";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: SETTINGS.DB_HOST,
    port: SETTINGS.DB_PORT,
    username: SETTINGS.DB_USER,
    password: SETTINGS.DB_PASSWORD,
    database: SETTINGS.DB_NAME,
    synchronize: true,
    logging: true,
    entities: ["src/entities/*.ts"],
    migrations: [],
    subscribers: [],
});