import * as dotenv from 'dotenv';
dotenv.config();

const env = process.env;

export class AppSettings {
    HOST: string = env.APPLICATION_SERVICE_HOST || '0.0.0.0';
    PORT: number = parseInt(env.APPLICATION_SERVICE_PORT || '3003') || 3003;
    PROTOCOL: string = env.APP_PROTOCOL || 'http';
    API_PREFIX: string = env.APP_API_PREFIX || '/api';
}

export class DatabaseSettings {
    HOST: string = env.DB_HOST || 'localhost';
    PORT: number = parseInt(env.DB_PORT || '3306') || 3306;
    NAME: string = env.APPLICATION_DB_NAME || 'application_service_db';
    USER: string = env.DB_USER || 'mysql';
    PASSWORD: string = env.DB_PASSWORD || 'mysql';
    ENTITIES: string = env.DB_ENTITIES || (process.env.NODE_ENV === 'production' ? 'dist/models/**/*.js' : 'src/models/**/*.ts');
}

export class ServiceSettings {
    USER_SERVICE_URL: string = env.USER_SERVICE_URL || 'http://localhost:3001';
    JOB_SERVICE_URL: string = env.JOB_SERVICE_URL || 'http://localhost:3002';
    SERVICE_TOKEN: string = env.SERVICE_TOKEN || 'service-secret-token';
}

export const settings = {
    app: new AppSettings(),
    db: new DatabaseSettings(),
    services: new ServiceSettings(),
}; 