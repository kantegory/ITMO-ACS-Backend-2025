import dotenv from 'dotenv';
dotenv.config();

class Config {
  APP_PORT: number = parseInt(process.env.APP_PORT || '3000');

  DB_HOST = process.env.DB_HOST || 'localhost';
  DB_PORT = parseInt(process.env.DB_PORT || '5432');
  DB_NAME = process.env.DB_NAME || 'db';
  DB_USER = process.env.DB_USER || 'user';
  DB_PASSWORD = process.env.DB_PASSWORD || 'qwerty';

  JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret';
  JWT_TOKEN_TYPE = process.env.JWT_SECRET_KEY || 'Bearer';
  JWT_ACCESS_TOKEN_LIFETIME: number = parseInt(process.env.JWT_ACCESS_TOKEN_LIFETIME || '300');

  YT_API_KEY = process.env.YT_API_KEY;
}

const config = new Config();

export default config;