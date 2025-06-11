import * as dotenv from 'dotenv';
dotenv.config();

const env = process.env;

export class AppSettings {
    HOST: string = env.JOB_SERVICE_HOST || '0.0.0.0';
    PORT: number = parseInt(env.JOB_SERVICE_PORT || '3002') || 3002;
    PROTOCOL: string = env.APP_PROTOCOL || 'http';
    API_PREFIX: string = env.APP_API_PREFIX || '/api';
}

export class DatabaseSettings {
    HOST: string = env.DB_HOST || 'localhost';
    PORT: number = parseInt(env.DB_PORT || '3306') || 3306;
    NAME: string = env.JOB_DB_NAME || 'job_service_db';
    USER: string = env.DB_USER || 'mysql';
    PASSWORD: string = env.DB_PASSWORD || 'mysql';
    ENTITIES: string = env.DB_ENTITIES || 'src/models/**/*.ts';
}

export class ServiceSettings {
    USER_SERVICE_URL: string = env.USER_SERVICE_URL || 'http://localhost:3001';
    APPLICATION_SERVICE_URL: string = env.APPLICATION_SERVICE_URL || 'http://localhost:3003';
    SERVICE_TOKEN: string = env.SERVICE_TOKEN || 'service-secret-token';
}

export const settings = {
    app: new AppSettings(),
    db: new DatabaseSettings(),
    services: new ServiceSettings(),
};