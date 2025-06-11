import { DataSource } from "typeorm"
import {createDatabase} from "typeorm-extension";
import { User } from "./models/UserModel";

const dotenv = require('dotenv')
const path = require('path')

const envFile = path.resolve(__dirname, '../auth.env');
dotenv.config({path: envFile})


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User],
    synchronize: true,
    logging: true,
})


export async function InitializeDatabase() {
    try {
        await createDatabase({ 
            options: AppDataSource.options,
            ifNotExist: true
        });
        await AppDataSource.initialize();
        console.log('Database connection established');
        return AppDataSource;
    } catch (error) {
        console.error('Database initialization failed:', error);
        throw error;
    }
}
