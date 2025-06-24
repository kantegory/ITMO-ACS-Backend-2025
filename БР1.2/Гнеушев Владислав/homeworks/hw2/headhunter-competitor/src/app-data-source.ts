import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "test",
    password: "test",
    database: "test",
    entities: ["dist/entity/*.js"],
    logging: true,
    synchronize: true,
})