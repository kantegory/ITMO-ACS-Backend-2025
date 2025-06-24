import dotenv from 'dotenv';

dotenv.config();

class Settings {
    DB_HOST = process.env.DB_HOST || 'localhost';
    DB_PORT = parseInt(process.env.DB_PORT || '15432');
    DB_NAME = process.env.DB_NAME || 'trainingAppDb';
    DB_USER = process.env.DB_USER || 'trainingAppDb';
    DB_PASSWORD = process.env.DB_PASSWORD || 'trainingAppDb';
    DB_MODELS: any = process.env.DB_MODELS || 'build/models/*.models.js';
    JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret';
    JWT_TOKEN_TYPE = process.env.JWT_TOKEN_TYPE || 'Bearer';
    JWT_ACCESS_TOKEN_LIFETIME: number =
        parseInt(process.env.JWT_ACCESS_TOKEN_LIFETIME || '300');
}

const SETTINGS = new Settings();

export default SETTINGS;