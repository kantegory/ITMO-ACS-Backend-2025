import { env } from 'process';
import dotenv from "dotenv";

dotenv.config();

class Settings {
    DB_HOST = env.DB_HOST;
    DB_PORT = parseInt(env.DB_PORT) || 5432;
    DB_NAME = env.DB_NAME;
    DB_USER = env.DB_USER;
    DB_PASSWORD = env.DB_PASSWORD;
    DB_ENTITIES = env.DB_ENTITIES || 'src/entities/*.ts';
    
    JWT_SECRET_KEY = env.JWT_SECRET_KEY || 'secret';
    JWT_TOKEN_TYPE = env.JWT_SECRET_KEY || 'Bearer';
    JWT_ACCESS_TOKEN_LIFETIME: number =
        parseInt(env.JWT_ACCESS_TOKEN_LIFETIME) || 60 * 5;
}

const SETTINGS = new Settings();

export default SETTINGS;