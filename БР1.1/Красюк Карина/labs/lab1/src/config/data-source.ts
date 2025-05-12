import {DataSource} from "typeorm";
import SETTINGS from "./settings";

export const appDataSource = new DataSource({
    type: 'postgres',
    host: SETTINGS.DB_HOST,
    port: SETTINGS.DB_PORT,
    username: SETTINGS.DB_USER,
    password: SETTINGS.DB_PASSWORD,
    database: SETTINGS.DB_NAME,
    entities: [SETTINGS.DB_ENTITIES],
    logging: true,
    synchronize: true,
    ssl: true
});

export default appDataSource;