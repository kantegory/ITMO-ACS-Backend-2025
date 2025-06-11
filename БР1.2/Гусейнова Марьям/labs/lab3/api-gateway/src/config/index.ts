import { config } from 'dotenv';
config();

interface AppConfig {
  port: number;
  userServiceUrl: string;
  workoutExerciseServiceUrl: string;
  planProgressServiceUrl: string;
  blogServiceUrl: string;
  jwtSecret: string;
}

const appConfig: AppConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  userServiceUrl: process.env.USER_SERVICE_URL || 'http://localhost:3001',
  workoutExerciseServiceUrl: process.env.WORKOUT_EXERCISE_SERVICE_URL || 'http://localhost:3002',
  planProgressServiceUrl: process.env.PLAN_PROGRESS_SERVICE_URL || 'http://localhost:3003',
  blogServiceUrl: process.env.BLOG_SERVICE_URL || 'http://localhost:3004',
  jwtSecret: process.env.JWT_SECRET || 'supersecretjwtkeyfallback', // Fallback, но должен быть в .env
};

// Проверка обязательных переменных окружения
const requiredEnvVars = [
    'USER_SERVICE_URL',
    'WORKOUT_EXERCISE_SERVICE_URL',
    'PLAN_PROGRESS_SERVICE_URL',
    'BLOG_SERVICE_URL',
    'JWT_SECRET'
];

const missingEnvVars = requiredEnvVars.filter(env => !process.env[env]);
if (missingEnvVars.length > 0) {
    console.error(`Missing required environment variables for API Gateway: ${missingEnvVars.join(', ')}`);
    process.exit(1);
}
// Дополнительная проверка на fallback JWT_SECRET
if (appConfig.jwtSecret === 'supersecretjwtkeyfallback') {
    console.warn('JWT_SECRET is not set in environment variables for API Gateway. Using fallback');
}

export default appConfig;