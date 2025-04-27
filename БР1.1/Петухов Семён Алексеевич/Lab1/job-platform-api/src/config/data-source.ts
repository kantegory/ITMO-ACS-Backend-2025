import { DataSource } from "typeorm";
import { BasicModel } from "../models/basicModel";
// (добавь сюда остальные модели)

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "your_user",
    password: "your_password",
    database: "resume_finder",
    synchronize: true,
    logging: false,
    entities: [BasicModel], // добавь все остальные
});
