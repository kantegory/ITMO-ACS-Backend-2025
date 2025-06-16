// Переменные окружения будут переданы Docker Compose

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
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || 'fitness_users_db', // Используем DB_DATABASE, переданный для user-service
  },
  jwtSecret: process.env.JWT_SECRET || 'supersecretjwtkey' // JWT_SECRET из .env
};

// Проверки наличия обязательных переменных окружения
if (!appConfig.db.password) {
  console.error('DB_PASSWORD is not set in environment variables for User Service. Exiting');
  process.exit(1);
}
if (!appConfig.db.database) {
  console.error('DB_DATABASE is not set in environment variables for User Service. Exiting');
  process.exit(1);
}
if (!appConfig.jwtSecret || appConfig.jwtSecret === 'supersecretjwtkey') {
    console.warn('JWT_SECRET is not set in environment variables or using default for User Service. This is unsafe');
}

export default appConfig;