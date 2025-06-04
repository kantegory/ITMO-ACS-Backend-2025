import "reflect-metadata";
import { DataSource } from "typeorm";

import { Resume } from "../entities/Resume";
import { Application } from "../entities/Application";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "application-db",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "search_job",
    synchronize: true,
    logging: false,
    entities: [Resume, Application],
});
