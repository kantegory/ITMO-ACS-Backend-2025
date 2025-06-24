import "reflect-metadata";
import { DataSource } from "typeorm";
import User from "./entities/User";
import Route from "./entities/Route";
import Trip from "./entities/Trip";
import Attraction from "./entities/Attraction";
import Booking from "./entities/Booking";
import Favorite from "./entities/Favorite";
import Comment from "./entities/Comment";
import Review from "./entities/Review";
import TravelType from "./entities/TravelType";
import Media from "./entities/Media";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "***",
    database: "travel_db",
    synchronize: true,
    logging: false,
    entities: [
        User,
        Route,
        Trip,
        Attraction,
        Booking,
        Favorite,
        Comment,
        Review,
        TravelType,
        Media
    ],
    migrations: [],
    subscribers: [],
});
