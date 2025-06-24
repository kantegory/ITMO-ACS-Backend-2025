import "reflect-metadata";
import { DataSource } from "typeorm";
import { Advertisement } from "../models/Advertisement";
import { Category } from "../models/Category";
import { Comfort } from "../models/Comfort";
import { CountryHouse } from "../models/CountryHouse";
import { Flat } from "../models/Flat";
import { Living } from "../models/Living";
import { LivingComfort } from "../models/LivingComfort";
import { LivingRules } from "../models/LivingRules";
import { Message } from "../models/Message";
import { Photo } from "../models/Photo";
import { Property } from "../models/Property";
import { Rental } from "../models/Rental";
import { Room } from "../models/Room";
import { Rules } from "../models/Rules";
import { User } from "../models/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "cian",
    synchronize: true,
    logging: true,
    entities: [
        Advertisement,
        Category,
        Comfort,
        CountryHouse,
        Flat,
        Living,
        LivingComfort,
        LivingRules,
        Message,
        Photo,
        Property,
        Rental,
        Room,
        Rules,
        User
    ],
    migrations: [],
    subscribers: [],
});
