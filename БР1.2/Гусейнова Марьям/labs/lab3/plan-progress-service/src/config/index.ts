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
  userServiceUrl: string;
  workoutExerciseServiceUrl: string;
}

const appConfig: AppConfig = {
  port: parseInt(process.env.PORT || '3003', 10),
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || 'fitness_plans_progress_db',
  },
  userServiceUrl: process.env.USER_SERVICE_URL || 'http://localhost:3001',
  workoutExerciseServiceUrl: process.env.WORKOUT_EXERCISE_SERVICE_URL || 'http://localhost:3002',
};

// Проверки
if (!appConfig.db.password) {
  console.warn('DB_PASSWORD is not set in environment variables for Plan & Progress Service.');
}
if (!process.env.DB_DATABASE) {
  console.error('DB_DATABASE is not set in environment variables for Plan & Progress Service.');
  process.exit(1);
}
if (!process.env.USER_SERVICE_URL) {
  console.warn('USER_SERVICE_URL is not set in environment variables for Plan & Progress Service. Using default: http://localhost:3001');
}
if (!process.env.WORKOUT_EXERCISE_SERVICE_URL) {
  console.warn('WORKOUT_EXERCISE_SERVICE_URL is not set in environment variables for Plan & Progress Service. Using default: http://localhost:3002');
}

export default appConfig;