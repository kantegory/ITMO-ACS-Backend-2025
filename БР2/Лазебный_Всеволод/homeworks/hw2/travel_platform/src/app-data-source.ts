import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "travel_user",
    password: "password123",
    database: "travel_db",
    synchronize: true,
    logging: true,
    entities: [__dirname + "/entities/*.ts"],
    migrations: [],
    subscribers: [],
});