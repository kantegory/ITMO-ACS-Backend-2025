import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 15432,
    username: "postgres",
    password: "postgres",
    database: "hells_kitchen_db",
    synchronize: true,
    logging: false,
    entities: ["src/models/*.ts"],
    migrations: [],
    subscribers: [],
})
