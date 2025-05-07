import { config } from 'dotenv';
import { env } from 'process';
config();

class Settings {
    APP_HOST: string = env.APP_HOST || 'localhost';
    APP_PORT: number = parseInt(env.APP_PORT || '8000', 10);
    APP_PROTOCOL: string = env.APP_PROTOCOL || 'http';
    APP_API_PREFIX: string = env.APP_API_PREFIX || '/api';

    DB_HOST = env.DB_HOST || 'localhost';
    DB_PORT = parseInt(env.DB_PORT || '5432', 10);
    DB_NAME = env.DB_NAME || 'realestate';
    DB_USER = env.DB_USER || 'test';
    DB_PASSWORD = env.DB_PASSWORD || 'test';
    DB_ENTITIES = env.DB_ENTITIES || 'dist/models/*.entity.js';

    JWT_SECRET_KEY = env.JWT_SECRET_KEY || 'secret';
    JWT_TOKEN_TYPE = env.JWT_TOKEN_TYPE || 'Bearer';
    JWT_ACCESS_TOKEN_LIFETIME = parseInt(env.JWT_ACCESS_TOKEN_LIFETIME || '300', 10);
}

export default new Settings();