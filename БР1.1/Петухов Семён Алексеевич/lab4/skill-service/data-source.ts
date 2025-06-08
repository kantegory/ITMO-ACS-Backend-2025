import { DataSource } from "typeorm";
import {Skill} from "./models/skillModel";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "resume_finder",
    synchronize: true,
    logging: false,
    entities: [
        Skill,
    ],
});
