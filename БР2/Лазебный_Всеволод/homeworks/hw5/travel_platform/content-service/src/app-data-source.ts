import "reflect-metadata";
import { DataSource } from "typeorm";
import { Booking } from "./entities/Booking";
import { Favorite } from "./entities/Favorite";
import { Review } from "./entities/Review";
import { Route } from "./entities/Route";
import { RoutePoint } from "./entities/RoutePoint";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "travel_user",
    password: process.env.DB_PASSWORD || "password123",
    database: process.env.DB_DATABASE || "travel_db",
    synchronize: true,
    logging: true,
    entities: [Booking, Favorite, Review, Route, RoutePoint],
    migrations: [],
    subscribers: [],
});