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
  port: parseInt(process.env.PORT || '3002', 10),
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || 'fitness_workouts_db', // Используем DB_DATABASE, переданный для workout-exercise-service
  },
};

// Проверки
if (!appConfig.db.password) {
  console.error('DB_PASSWORD is not set in environment variables for Workout & Exercise Service. Exiting.');
  process.exit(1);
}
if (!appConfig.db.database) {
  console.error('DB_DATABASE is not set in environment variables for Workout & Exercise Service. Exiting.');
  process.exit(1);
}

export default appConfig;