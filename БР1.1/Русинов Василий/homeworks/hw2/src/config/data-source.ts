import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Resume } from "../entities/Resume";
import { Application } from "../entities/Application";
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
    synchronize: true, // На проде false
    logging: false,
    entities: [User, Resume, Application, Job, Employer, Industry],
});
