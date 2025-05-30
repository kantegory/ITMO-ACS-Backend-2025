import * as dotenv from 'dotenv';
dotenv.config();

const env = process.env;

export class AppSettings {
    HOST: string = env.APP_HOST || '0.0.0.0';
    PORT: number = parseInt(env.APP_PORT || '8080') || 8080;
    PROTOCOL: string = env.APP_PROTOCOL || 'http';
    CONTROLLERS_PATH: string =
        env.APP_CONTROLLERS_PATH || '/controllers/*.controller.js';
    API_PREFIX: string = env.APP_API_PREFIX || '/api';
}

export class DatabaseSettings {
    HOST: string = env.DB_HOST || 'localhost';
    PORT: number = parseInt(env.DB_PORT || '3306') || 3306;
    NAME: string = env.DB_NAME || 'mysql';
    USER: string = env.DB_USER || 'mysql';
    PASSWORD: string = env.DB_PASSWORD || 'mysql';
    ENTITIES: string = env.DB_ENTITIES || 'src/models/**/*.ts';
    SUBSCRIBERS: string = env.DB_SUBSCRIBERS || 'src/subscribers/**/*.ts';
}

export class AuthSettings {
    SECRET_KEY: string = env.JWT_SECRET_KEY || 'secret';
    TOKEN_TYPE: string = env.JWT_TOKEN_TYPE || 'Bearer';
    ACCESS_TOKEN_LIFETIME: number = parseInt(env.JWT_ACCESS_TOKEN_LIFETIME || (60 * 5).toString()) || (60 * 5);
}

export const settings = {
    app: new AppSettings(),
    db: new DatabaseSettings(),
    auth: new AuthSettings(),
}; 