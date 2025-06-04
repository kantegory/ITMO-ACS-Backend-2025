import "reflect-metadata";
import { DataSource } from "typeorm";
import Attraction from "../entities/Attraction";
import Media from "../entities/Media";
import Route from "../entities/Route";
import TravelType from "../entities/TravelType";
import Trip from "../entities/Trip";
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
    entities: [Attraction, Media, Route, TravelType, Trip],
    migrations: [],
    subscribers: [],
});