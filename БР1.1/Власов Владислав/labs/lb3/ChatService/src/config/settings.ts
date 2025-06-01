import { env } from 'process';
import dotenv from 'dotenv';
dotenv.config();

class Settings {
// db connection settings

    constructor()
    {
        console.log(this.DB_HOST)
    }

    DB_HOST = env.DB_HOST;
    DB_PORT = parseInt(env.DB_PORT);
    DB_NAME = env.DB_NAME;
    DB_USER = env.DB_USER;
    DB_PASSWORD = env.DB_PASSWORD;
    DB_ENTITIES = 'src/models/*.ts'
    DB_MIGRATION = 'src/migration/*.ts'

    JWT_SECRET_KEY = env.JWT_SECRET_KEY
    JWT_ACCESS_TOKEN_LIFETIME = parseInt(env.JWT_ACCESS_TOKEN_LIFETIME)
}
    
const SETTINGS = new Settings();

export default SETTINGS