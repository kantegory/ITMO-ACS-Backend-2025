import "reflect-metadata";
import { DataSource } from "typeorm";
import {Job} from "../entities/Job";
import {Employer} from "../entities/Employer";
import {Industry} from "../entities/Industry";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "search_job",
    synchronize: true,
    logging: false,
    entities: [Job, Employer, Industry],
});
