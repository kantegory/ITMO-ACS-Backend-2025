import dotenv from 'dotenv';

dotenv.config();

class Settings {
    // db connection settings
    DB_HOST = process.env.DB_HOST || 'localhost';
    DB_PORT = parseInt(process.env.DB_PORT || '15432');
    DB_NAME = process.env.DB_NAME || 'maindb';
    DB_USER = process.env.DB_USER || 'maindb';
    DB_PASSWORD = process.env.DB_PASSWORD || 'maindb';
    DB_ENTITIES = process.env.DB_ENTITIES || 'build/models/*.entity.js';

    JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret';
}

const SETTINGS = new Settings();

export default SETTINGS;