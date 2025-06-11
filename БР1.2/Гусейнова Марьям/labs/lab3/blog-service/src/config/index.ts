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
}

const appConfig: AppConfig = {
  port: parseInt(process.env.PORT || '3004', 10),
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || 'fitness_blog_db',
  },
};

// Проверки
if (!appConfig.db.password) {
  console.warn('DB_PASSWORD is not set in environment variables for Blog Service.');
}
if (!process.env.DB_DATABASE) {
  console.error('DB_DATABASE is not set in environment variables for Blog Service.');
  process.exit(1);
}

export default appConfig;