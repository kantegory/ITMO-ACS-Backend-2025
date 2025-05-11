// src/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'Документация для моего API',
        },
        servers: [
            {
                url: 'http://localhost:3000', // URL вашего сервера
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Укажите путь к вашим маршрутам
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
