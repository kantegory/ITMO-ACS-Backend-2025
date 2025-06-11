import { DataSource } from "typeorm"
import {createDatabase} from "typeorm-extension";
import { Message } from "./models/MessageModel";

const dotenv = require('dotenv')
const path = require('path')

const envFile = path.resolve(__dirname, '../messanger.env');
dotenv.config({path: envFile})

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Message],
    synchronize: true,
    logging: true,
})

async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function InitializeDatabase() {
    try {
        await createDatabase({ 
            options: AppDataSource.options,
            ifNotExist: true
        });
        await sleep(7000);
        await AppDataSource.initialize();
        console.log('Database connection established');
        return AppDataSource;
    } catch (error) {
        console.error('Database initialization failed:', error);
        throw error;
    }
}
