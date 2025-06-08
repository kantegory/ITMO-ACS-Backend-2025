import dotenv from 'dotenv';

dotenv.config();

class Settings {
    JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret';
    JWT_TOKEN_TYPE = process.env.JWT_TOKEN_TYPE || 'Bearer';
    JWT_ACCESS_TOKEN_LIFETIME: number =
        parseInt(process.env.JWT_ACCESS_TOKEN_LIFETIME || '300');
}

const SETTINGS = new Settings();

export default SETTINGS;