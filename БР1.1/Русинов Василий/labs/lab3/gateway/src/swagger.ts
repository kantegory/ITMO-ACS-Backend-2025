import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import * as fs from "node:fs";

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Job Board API',
            version: '1.0.0',
        },
    },
    apis: ['./src/routes/*.ts'], // Комментарии JSDoc внутри routes/*.ts
};

const swaggerSpec = swaggerJsdoc(options);
fs.writeFileSync("./src/swagger.json", JSON.stringify(swaggerSpec, null, 2));
export function setupSwagger(app: Express) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
