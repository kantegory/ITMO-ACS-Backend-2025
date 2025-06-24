"use strict";
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API документация',
            version: '1.0.0',
            description: 'Автодокументирование API через Swagger',
        },
        servers: [
            {
                url: 'http://localhost:5001',
            },
        ],
    },
    apis: [
        './src/route/job.route.ts'
    ],
};
const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
