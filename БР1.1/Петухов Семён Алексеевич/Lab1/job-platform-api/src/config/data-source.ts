import { DataSource } from "typeorm";
import { BasicModel } from "../models/basicModel";
// (добавь сюда остальные модели)

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "resume_finder",
    synchronize: true,
    logging: false,
    entities: [BasicModel], // добавь все остальные
});
