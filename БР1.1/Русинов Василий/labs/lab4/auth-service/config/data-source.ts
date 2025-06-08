import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "auth-db",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "search_job",
    synchronize: true,
    logging: false,
    entities: [User],
});
