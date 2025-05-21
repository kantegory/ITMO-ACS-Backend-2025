import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/user";
import {Property} from "./models/property";
import {Rental} from "./models/rental";
import {Message} from "./models/message";
import {Favorite} from "./models/favorite";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Property, Rental, Message, Favorite],
    migrations: [],
    subscribers: [],
});