import "reflect-metadata";
import { DataSource } from "typeorm";
import { Rental } from "../models/rental.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "rental_db",
    synchronize: true,
    logging: false,
    entities: [Rental],
    migrations: [],
    subscribers: [],
});