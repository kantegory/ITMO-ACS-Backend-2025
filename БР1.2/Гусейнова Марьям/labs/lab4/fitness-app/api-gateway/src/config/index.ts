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
  jwtSecret: process.env.JWT_SECRET || 'supersecretjwtkeyfallback',
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
    // Не выходим, если JWT_SECRET не установлен явно, но предупреждаем
    if (missingEnvVars.includes('JWT_SECRET') && appConfig.jwtSecret === 'supersecretjwtkeyfallback') {
        console.warn('Using fallback JWT_SECRET for API Gateway. This is unsafe');
    } else {
        process.exit(1); // Выходим, если не хватает других критичных переменных
    }
} else if (appConfig.jwtSecret === 'supersecretjwtkeyfallback') {
    // Дополнительная проверка на fallback JWT_SECRET, если все остальные переменные есть
    console.warn('JWT_SECRET is not set in environment variables for API Gateway. Using fallback.');
}

export default appConfig;