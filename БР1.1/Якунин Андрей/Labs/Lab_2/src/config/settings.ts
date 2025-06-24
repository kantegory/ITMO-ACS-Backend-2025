import dotenv from 'dotenv';

dotenv.config();

class Settings {
    DB_HOST = process.env.TYPEORM_HOST || 'localhost';
    DB_PORT = parseInt(process.env.TYPEORM_PORT || '5432');
    DB_NAME = process.env.TYPEORM_DATABASE || 'boilerplate';
    DB_USER = process.env.TYPEORM_USERNAME || 'postgres';
    DB_PASSWORD = process.env.TYPEORM_PASSWORD || 'postgres';
    DB_ENTITIES = process.env.DB_ENTITIES || 'dist/models/*.entity.js';
}

const SETTINGS = new Settings();

export default SETTINGS;
