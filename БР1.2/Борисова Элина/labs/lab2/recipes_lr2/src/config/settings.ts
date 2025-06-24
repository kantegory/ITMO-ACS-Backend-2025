import { env } from 'process';

class Settings {
    // Application
    APP_HOST: string = env.APP_HOST || 'localhost';
    APP_PORT: number = parseInt(env.APP_PORT || '3000');
    APP_PROTOCOL: string = env.APP_PROTOCOL || 'http';

    // Database
    DB_HOST: string = env.DB_HOST || 'localhost';
    DB_PORT: number = parseInt(env.DB_PORT || '5432');
    DB_NAME: string = env.DB_NAME || 'recipe_service';
    DB_USER: string = env.DB_USER || 'elinaborisova';
    DB_PASSWORD: string = env.DB_PASSWORD || '';

    // JWT
    JWT_SECRET_KEY: string = env.JWT_SECRET_KEY || 'your_strong_secret_key';
    JWT_TOKEN_TYPE: string = env.JWT_TOKEN_TYPE || 'Bearer';
    JWT_ACCESS_TOKEN_LIFETIME: string = env.JWT_ACCESS_TOKEN_LIFETIME || '24h';

    // Password hashing
    BCRYPT_SALT_ROUNDS: number = parseInt(env.BCRYPT_SALT_ROUNDS || '10');
}

const SETTINGS = new Settings();

export default SETTINGS;