import { env } from 'process';

class Settings {
    // application base settings
    APP_ENVIRONMENT: string = env.NODE_ENV || 'development';
    APP_HOST: string = env.APP_HOST || 'localhost';
    APP_PORT: number = env.APP_PORT ? parseInt(env.APP_PORT) : 8000;
    APP_PROTOCOL: string = env.APP_PROTOCOL || 'http';
    APP_CONTROLLERS_PATH: string = env.APP_CONTROLLERS_PATH
        || (this.APP_ENVIRONMENT === 'production'
        ? 'dist/controllers/*.controller.js'
        : 'src/controllers/*.controller.ts');
    APP_API_PREFIX: string = env.APP_API_PREFIX || '/api';

    APP_NAME = process.env.APP_NAME || 'HH-like API';
    APP_DESCRIPTION = process.env.APP_DESCRIPTION || 'API documentation';
    APP_VERSION = process.env.APP_VERSION || '0.1.0';

    // db connection settings
    DB_HOST = env.DB_HOST || 'localhost';
    DB_PORT = env.DB_PORT ? parseInt(env.DB_PORT) : 5432;
    DB_NAME = env.DB_NAME || 'postgres';
    DB_USER = env.DB_USER || 'postgres';
    DB_PASSWORD = env.DB_PASSWORD || 'postgres';
    DB_ENTITIES = env.DB_ENTITIES
        || (this.APP_ENVIRONMENT === 'production'
            ? 'dist/models/**/*.js'
            : 'src/models/**/*.ts');
    DB_SUBSCRIBERS = env.DB_SUBSCRIBERS
        || (this.APP_ENVIRONMENT === 'production'
            ? 'dist/subscribers/**/*.js'
            : 'src/subscribers/**/*.ts');
    DB_MIGRATIONS = env.DB_MIGRATIONS
        || (this.APP_ENVIRONMENT === 'production'
            ? 'dist/migrations/**/*.js'
            : 'src/migrations/**/*.ts');

    // jwt settings
    JWT_SECRET_KEY = env.JWT_SECRET_KEY || 'secret';
    JWT_TOKEN_TYPE = env.JWT_SECRET_KEY || 'Bearer';
    JWT_ACCESS_TOKEN_LIFETIME: number =
        env.JWT_ACCESS_TOKEN_LIFETIME ? parseInt(env.JWT_ACCESS_TOKEN_LIFETIME) : 60 * 5;
}

const SETTINGS = new Settings();

export default SETTINGS;