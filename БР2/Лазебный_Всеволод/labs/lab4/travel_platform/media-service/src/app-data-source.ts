import "reflect-metadata";
import { DataSource } from "typeorm";
import { Media } from "./entities/Media";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "travel_user",
    password: process.env.DB_PASSWORD || "password123",
    database: process.env.DB_DATABASE || "travel_db",
    synchronize: true,
    logging: true,
    entities: [Media],
    migrations: [],
    subscribers: [],
});