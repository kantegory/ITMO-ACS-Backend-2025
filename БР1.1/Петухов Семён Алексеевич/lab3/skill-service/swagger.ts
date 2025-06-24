// src/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Skill-Service API',
            version: '1.0.0',
            description: 'Документация для микросервиса навыков',
        },
        servers: [
            {
                url: 'http://localhost:3005/skill-service/', // URL вашего сервера
            },
        ],
        components: {
            schemas: {
                Skill: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        skill_name: { type: 'string', example: 'JavaScript' },
                        description: { type: 'string', nullable: true, example: 'Язык программирования для веба' },
                        // Связи можно указать ID связанных сущностей (опционально)
                        resumeSkills: { type: 'array', items: { type: 'integer' }, example: [3, 5] },
                        vacancySkills: { type: 'array', items: { type: 'integer' }, example: [7, 8] },
                    },
                },

                SkillInput: {
                    type: 'object',
                    required: ['skill_name'],
                    properties: {
                        skill_name: { type: 'string', example: 'JavaScript' },
                        description: { type: 'string', nullable: true, example: 'Язык программирования для веба' },
                    },
                },
            },
        },
    },
    apis: ['./routes/*.ts'], // путь к вашим файлам с аннотациями swagger
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
