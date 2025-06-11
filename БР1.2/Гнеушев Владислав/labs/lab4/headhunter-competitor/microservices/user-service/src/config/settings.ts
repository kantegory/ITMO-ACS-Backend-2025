import * as dotenv from 'dotenv';
dotenv.config();

const env = process.env;

export class AppSettings {
    HOST: string = env.USER_SERVICE_HOST || '0.0.0.0';
    PORT: number = parseInt(env.USER_SERVICE_PORT || '3001') || 3001;
    PROTOCOL: string = env.APP_PROTOCOL || 'http';
    API_PREFIX: string = env.APP_API_PREFIX || '/api';
}

export class DatabaseSettings {
    HOST: string = env.DB_HOST || 'localhost';
    PORT: number = parseInt(env.DB_PORT || '3306') || 3306;
    NAME: string = env.USER_DB_NAME || 'user_service_db';
    USER: string = env.DB_USER || 'mysql';
    PASSWORD: string = env.DB_PASSWORD || 'mysql';
    ENTITIES: string = env.DB_ENTITIES || (process.env.NODE_ENV === 'production' ? 'dist/models/**/*.js' : 'src/models/**/*.ts');
}

export class AuthSettings {
    SECRET_KEY: string = env.JWT_SECRET_KEY || 'user-service-secret';
    TOKEN_TYPE: string = env.JWT_TOKEN_TYPE || 'Bearer';
    ACCESS_TOKEN_LIFETIME: number = parseInt(env.JWT_ACCESS_TOKEN_LIFETIME || (24 * 60 * 60).toString()) || (24 * 60 * 60);
}

export class ServiceSettings {
    JOB_SERVICE_URL: string = env.JOB_SERVICE_URL || 'http://localhost:3002';
    APPLICATION_SERVICE_URL: string = env.APPLICATION_SERVICE_URL || 'http://localhost:3003';
    SERVICE_TOKEN: string = env.SERVICE_TOKEN || 'service-secret-token';
}

export const settings = {
    app: new AppSettings(),
    db: new DatabaseSettings(),
    auth: new AuthSettings(),
    services: new ServiceSettings(),
}; 