import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    entities: [__dirname + '/../entities/**/*.{ts,js}'],
    logging: true,
    synchronize: true,
})