import 'dotenv/config'

class Settings {
    DB_HOST = process.env.DB_HOST || 'localhost';
    DB_PORT = parseInt(process.env.DB_PORT ?? '') || 15432;
    DB_NAME = process.env.DB_NAME || 'maindb';
    DB_USER = process.env.DB_USER || 'maindb';
    DB_PASSWORD = process.env.DB_PASSWORD || 'maindb';
    API_PORT = parseInt(process.env.API_PORT ?? '') || 8000;
    JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '123';
    APP_API_PREFIX = process.env.APP_API_PREFIX || '/api';
    APP_CONTROLLERS_PATH = process.env.APP_CONTROLLERS_PATH || '/controllers/*.ts';
}

export const SETTINGS = new Settings();

