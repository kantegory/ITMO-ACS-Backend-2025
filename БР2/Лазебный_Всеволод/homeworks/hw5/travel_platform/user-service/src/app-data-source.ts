import "reflect-metadata";
import { DataSource } from "typeorm";
import { Follow } from "./entities/Follow"
import { Message } from "./entities/Message"
import { User } from "./entities/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "travel_user",
    password: process.env.DB_PASSWORD || "password123",
    database: process.env.DB_DATABASE || "travel_db",
    synchronize: true,
    logging: true,
    entities: [User, Message, Follow],
    migrations: [],
    subscribers: [],
});