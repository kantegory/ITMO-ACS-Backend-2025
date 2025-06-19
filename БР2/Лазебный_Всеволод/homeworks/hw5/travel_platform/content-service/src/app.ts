import express from "express";
import dotenv from 'dotenv';
import { AppDataSource } from "./app-data-source";
import router from "./routes";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
// @ts-ignore
import { rabbitMQ } from "../shared/rabbitmq";

rabbitMQ.connect().then(async () => {
    // Создаем обменники
    await rabbitMQ.createExchange('route_events');
    await rabbitMQ.createExchange('booking_events');

    // Подписываемся на события пользователей
    await rabbitMQ.subscribe(
        'user_events',
        'content_user_queue',
        'user.created',
        (user: any) => {
            console.log('New user created:', user);
            // Логика обработки нового пользователя
        }
    );

    console.log('Content service RabbitMQ initialized');
}).catch((err: any) => {
    console.error('Content service RabbitMQ init error:', err);
});

dotenv.config({ path: '.env' });
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env file");
}
AppDataSource.initialize()
    .then(() => console.log("Data Source has been initialized!"))
    .catch(err => console.error("Error during initialization:", err));
const app = express();
app.use(express.json());
const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Travel Platform API',
            version: '1.0.0',
            description: 'API documentation for Travel Platform',
        },
        servers: [
            {
                url: 'http://localhost:3002/api',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes.ts', './src/controllers/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", router);
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});
const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`JWT Secret: ${process.env.JWT_SECRET ? "Set" : "Not set"}`);
    console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});