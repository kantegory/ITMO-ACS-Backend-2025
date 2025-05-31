// src/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'User-Service API',
            version: '1.0.0',
            description: 'Документация для микросервиса пользователей',
        },
        servers: [
            {
                url: 'http://localhost:3000/user-service/', // URL вашего сервера
            },
        ],
        components: {
            schemas: {
                UserRole: {
                    type: 'string',
                    enum: ['соискатель', 'работодатель'],
                    example: 'соискатель',
                },

                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        username: { type: 'string', example: 'john_doe' },
                        email: { type: 'string', example: 'john@example.com' },
                        password: { type: 'string', example: 'hashed_password' }, // обычно пароль не показывают, но для примера
                        role: { $ref: '#/components/schemas/UserRole' },
                        companyId: { type: ['integer', 'null'], example: 3, nullable: true }, // id компании или null
                        resumes: {
                            type: 'array',
                            items: { type: 'integer' },
                            example: [5, 7],
                            nullable: true,
                        },
                        applications: {
                            type: 'array',
                            items: { type: 'integer' },
                            example: [10, 12],
                            nullable: true,
                        },
                        motivationLetters: {
                            type: 'array',
                            items: { type: 'integer' },
                            example: [15, 17],
                            nullable: true,
                        },
                    },
                },

                UserInput: {
                    type: 'object',
                    required: ['username', 'email', 'password', 'role'],
                    properties: {
                        username: { type: 'string', example: 'john_doe' },
                        email: { type: 'string', example: 'john@example.com' },
                        password: { type: 'string', example: 'plain_password' },
                        role: { $ref: '#/components/schemas/UserRole' },
                        companyId: { type: ['integer', 'null'], example: 3, nullable: true },
                    },
                },
            },
        },
    },
    apis: ['./routes/*.ts'], // путь к вашим файлам с аннотациями swagger
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
