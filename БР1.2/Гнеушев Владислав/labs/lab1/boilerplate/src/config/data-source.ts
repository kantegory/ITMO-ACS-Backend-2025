import { DataSource } from "typeorm"
import { settings } from "./settings"

export const myDataSource = new DataSource({
    type: "mysql",
    host: settings.db.HOST,
    port: settings.db.PORT,
    username: settings.db.USER,
    password: settings.db.PASSWORD,
    database: settings.db.NAME,
    entities: [settings.db.ENTITIES],
    subscribers: [settings.db.SUBSCRIBERS],
    logging: process.env.NODE_ENV === 'development',
    synchronize: process.env.NODE_ENV === 'development',
}) 