import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "elinaborisova",
    password: "",
    database: "recipe_service",
    synchronize: true,
    logging: true,
    entities: [__dirname + "/entities/*.ts"],
    migrations: [],
    subscribers: [],
});