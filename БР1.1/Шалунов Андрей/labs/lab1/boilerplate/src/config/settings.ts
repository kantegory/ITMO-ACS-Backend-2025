import { config } from 'dotenv';
config();

class Settings {
    APP_PORT = parseInt(process.env.APP_PORT || '3000', 10);

    DB_HOST = process.env.DB_HOST || 'localhost';
    DB_PORT = parseInt(process.env.DB_PORT || '5432', 10);
    DB_NAME = process.env.DB_NAME || 'lab1_db';
    DB_USER = process.env.DB_USER || 'test';
    DB_PASSWORD = process.env.DB_PASSWORD || 'test';
    DB_ENTITIES = process.env.DB_ENTITIES || 'src/models/*.entity.ts';

    JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret';
    JWT_TOKEN_TYPE = process.env.JWT_TOKEN_TYPE || 'Bearer';
    JWT_ACCESS_TOKEN_LIFETIME = parseInt(process.env.JWT_ACCESS_TOKEN_LIFETIME || '300', 10);
}

export default new Settings();
