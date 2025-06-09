import "reflect-metadata";
import { DataSource } from "typeorm";
import {Booking} from "../entities/Booking";
import {Favorite} from "../entities/Favorite";

import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "postgres",
    database: process.env.DB_NAME || "travel_service",
    synchronize: true,
    logging: false,
    entities: [Booking, Favorite],
    migrations: [],
    subscribers: [],
});