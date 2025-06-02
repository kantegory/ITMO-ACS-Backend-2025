import "reflect-metadata";
import {DataSource} from "typeorm";
import {User} from "./models/User";
import {Tag} from "./models/Tag";
import {Subscription} from "./models/Subscribtion";
import {Recipe} from "./models/Recipe";
import {Like} from "./models/Like";
import {Comment} from "./models/Comment";

if (!process.env.POSTGRES_PASSWORD) {
    throw new Error("Missing POSTGRES_PASSWORD in environment");
}

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST!,
    port: parseInt(process.env.POSTGRES_PORT! || "5432", 10),
    username: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_DB!,
    synchronize: true,
    logging: false,
    entities: [User, Tag, Subscription, Recipe, Like, Comment],
    migrations: [],
    subscribers: [],
});
