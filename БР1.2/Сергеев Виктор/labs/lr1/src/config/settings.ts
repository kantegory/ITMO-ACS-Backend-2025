import { env } from 'process';
import { randomBytes } from 'crypto';

class Settings {
    // application base settings
    APP_HOST: string = env.APP_HOST || 'localhost';
    APP_PORT: number = parseInt(env.APP_PORT) || 3000;
    APP_PROTOCOL: string = env.APP_PROTOCOL || 'http';
    APP_CONTROLLERS_PATH: string =
        env.APP_CONTROLLERS_PATH || 'src/controllers/*.ts';
    APP_API_PREFIX: string = env.APP_API_PREFIX || '/api';

    // db connection settings
    DB_HOST = env.DB_HOST || 'localhost';
    DB_PORT = parseInt(env.DB_PORT) || 15432;
    DB_NAME = env.DB_NAME || 'hells_kitchen_db';
    DB_USER = env.DB_USER || 'postgres';
    DB_PASSWORD = env.DB_PASSWORD || 'postgres';
    DB_ENTITIES = env.DB_ENTITIES || 'src/models/*.ts';

    // jwt settings
    JWT_SECRET_KEY = env.JWT_SECRET_KEY || randomBytes(32);
    JWT_TOKEN_TYPE = env.JWT_SECRET_KEY || 'Bearer';
    JWT_ACCESS_TOKEN_LIFETIME: number =
        parseInt(env.JWT_ACCESS_TOKEN_LIFETIME) || 60 * 60;
}

const SETTINGS = new Settings();

export default SETTINGS;