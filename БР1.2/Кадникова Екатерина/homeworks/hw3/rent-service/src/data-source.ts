import { DataSource } from "typeorm";
import { User } from "./models/User";
import { Property } from "./models/Property";
import { Rental } from "./models/Rental";
import { Message } from "./models/Message";
import { Favorite } from "./models/Favorite";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "richard2023",
    database: "rent_db",
    synchronize: true,
    logging: true,
    entities: [User, Property, Rental, Message, Favorite],
    subscribers: [],
    migrations: [],
});
