declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    POSTGRES_HOST: string;
    POSTGRES_PORT: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
  }
}
