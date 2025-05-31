import { DataSource } from "typeorm";
import { User } from "./models/userModel";
import {Skill} from "./models/skillModel";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
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
