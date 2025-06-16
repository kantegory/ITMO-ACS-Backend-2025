import appConfig from './config'; 
import express from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { Request, Response } from 'express';
import { authMiddleware } from './middlewares/auth.middleware';

const app = express();
const PORT = appConfig.port; 

app.use(express.json());

// Middleware для логирования запросов
app.use((req, res, next) => {
  console.log(`[Gateway] Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use(authMiddleware);

// Функция для создания конфигурации прокси
const createProxyConfig = (
    target: string,
    pathRewrite: Record<string, string>
): Options => ({
    target,
    changeOrigin: true,
    pathRewrite,
    on: {
        proxyReq: (proxyReq, req, res) => {
            const typedReq = req as Request;
            
            // Установка заголовка x-user-id
            if (typedReq.userId) {
                proxyReq.setHeader('x-user-id', typedReq.userId.toString());
            }

            // Передача тела запроса
            if (typedReq.body) {
                const bodyData = JSON.stringify(typedReq.body);
                proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
                proxyReq.write(bodyData);
            }

            console.log(`[Gateway Proxy] Proxying to: ${proxyReq.path}`);
        },
        proxyRes: (proxyRes) => {
            console.log(`[Gateway Proxy] Response: ${proxyRes.statusCode}`);
        },
        error: (err, req, res) => {
            console.error(`[Gateway Proxy Error]:`, err);
            // Проверяем, что res - это объект ответа Express
            if (res && typeof (res as Response).status === 'function') {
                (res as Response).status(500).json({ message: 'Service unavailable' });
            }
        }
    }
});

// Конфигурация прокси для сервисов
const servicesConfig = [
    { path: '/users', target: appConfig.userServiceUrl, rewrite: { '^': '/users' } },
    { path: '/current-progress', target: appConfig.userServiceUrl, rewrite: { '^': '/current-progress' } },
    { path: '/workouts', target: appConfig.workoutExerciseServiceUrl, rewrite: { '^': '/workouts' } },
    { path: '/exercises', target: appConfig.workoutExerciseServiceUrl, rewrite: { '^': '/exercises' } },
    { path: '/exercise-workouts', target: appConfig.workoutExerciseServiceUrl, rewrite: { '^': '/exercise-workouts' } },
    { path: '/plans', target: appConfig.planProgressServiceUrl, rewrite: { '^': '/plans' } },
    { path: '/plan-progress', target: appConfig.planProgressServiceUrl, rewrite: { '^': '/plan-progress' } },
    { path: '/exercise-progress', target: appConfig.planProgressServiceUrl, rewrite: { '^': '/exercise-progress' } },
    { path: '/workout-in-plan', target: appConfig.planProgressServiceUrl, rewrite: { '^': '/workout-in-plan' } },
    { path: '/blog-posts', target: appConfig.blogServiceUrl, rewrite: { '^': '/blog-posts' } },
];

// Регистрация прокси-маршрутов
servicesConfig.forEach(({ path, target, rewrite }) => {
    app.use(path, createProxyMiddleware(createProxyConfig(target, rewrite)));
});

// Health check
app.get('/health', (req, res) => {
    res.status(200).send('API Gateway is healthy');
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`API Gateway running on http://localhost:${PORT}`);
    console.log('--- Services ---');
    servicesConfig.forEach(service => {
        console.log(`${service.path.padEnd(20)} => ${service.target}`);
    });
});