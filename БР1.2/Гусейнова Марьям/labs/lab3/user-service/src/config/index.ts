import { config } from 'dotenv';
config();

interface AppConfig {
  port: number;
  db: {
    host: string;
    port: number;
    username: string;
    password?: string;
    database: string;
  };
  jwtSecret: string;
}

const appConfig: AppConfig = {
  port: parseInt(process.env.PORT || '3001', 10),
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || 'fitness_users_db',
  },
  jwtSecret: process.env.JWT_SECRET || 'supersecretjwtkey' // дефолтное значение
};

// Проверки наличия обязательных переменных окружения
if (!appConfig.db.password) {
  console.warn('DB_PASSWORD is not set in environment variables.');
}
if (!process.env.DB_DATABASE) {
  console.error('DB_DATABASE is not set in environment variables.');
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
    console.warn('JWT_SECRET is not set in environment variables. Using default.');
}

export default appConfig;