// src/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Vacancy-Service API',
            version: '1.0.0',
            description: 'Документация для микросервиса вакансий',
        },
        servers: [
            {
                url: 'http://localhost:3000/vacancy-service/',
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
            schemas: {
                Company: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        name: {
                            type: 'string',
                            example: 'Компания А',
                        },
                        description: {
                            type: 'string',
                            example: 'Описание компании',
                        },
                        location: {
                            type: 'string',
                            nullable: true,
                            example: 'Москва',
                        },
                    },
                },
                CompanyInput: {
                    type: 'object',
                    required: ['name', 'description'],
                    properties: {
                        name: {
                            type: 'string',
                            example: 'Компания А',
                        },
                        description: {
                            type: 'string',
                            example: 'Описание компании',
                        },
                        location: {
                            type: 'string',
                            nullable: true,
                            example: 'Москва',
                        },
                    },
                },
                Application: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        resumeId: {
                            type: 'integer',
                            example: 3,
                        },
                        userId: {
                            type: 'integer',
                            example: 2,
                        },
                        vacancyId: {
                            type: 'integer',
                            example: 4,
                        },
                        status: {
                            type: 'string',
                            example: 'pending',
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time',
                            example: '2025-05-23T14:00:00Z',
                        },
                    },
                },

                ApplicationInput: {
                    type: 'object',
                    required: ['resume', 'user', 'vacancy', 'status'],
                    properties: {
                        resumeId: {
                            type: 'integer',
                            example: 3,
                        },
                        userId: {
                            type: 'integer',
                            example: 2,
                        },
                        vacancyId: {
                            type: 'integer',
                            example: 4,
                        },
                        status: {
                            type: 'string',
                            example: 'pending',
                        },
                    },
                },
                MotivationLetter: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        userId: {
                            type: 'integer',
                            example: 2,
                        },
                        vacancyId: {
                            type: 'integer',
                            example: 5,
                        },
                        title: {
                            type: 'string',
                            example: 'Письмо на позицию Junior Backend Developer',
                        },
                        content: {
                            type: 'string',
                            example: 'Уважаемая компания, я заинтересован в вашей вакансии...',
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time',
                            example: '2025-05-23T14:00:00Z',
                        },
                    },
                },

                MotivationLetterInput: {
                    type: 'object',
                    required: ['user', 'vacancy', 'title', 'content'],
                    properties: {
                        userId: {
                            type: 'integer',
                            example: 2,
                        },
                        vacancyId: {
                            type: 'integer',
                            example: 5,
                        },
                        title: {
                            type: 'string',
                            example: 'Письмо на позицию Junior Backend Developer',
                        },
                        content: {
                            type: 'string',
                            example: 'Уважаемая компания, я заинтересован в вашей вакансии...',
                        },
                    },
                },

                VacancySkills: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        vacancyId: { type: 'integer', example: 5 }, // id вакансии
                        skillId: { type: 'integer', example: 3 },   // id навыка
                    },
                },

                VacancySkillsInput: {
                    type: 'object',
                    required: ['vacancy', 'skill'],
                    properties: {
                        vacancyId: { type: 'integer', example: 5 },
                        skillId: { type: 'integer', example: 3 },
                    },
                },
                Vacancy: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        title: { type: 'string', example: 'Frontend Developer' },
                        description: { type: 'string', example: 'Разработка интерфейсов...', nullable: true },
                        industry: { type: 'string', example: 'IT', nullable: true },
                        requirements: { type: 'string', example: 'Опыт работы от 3 лет', nullable: true },
                        salary: { type: 'integer', example: 70000, nullable: true },
                        work_exp: { type: 'string', example: '3 года', nullable: true },
                        companyId: { type: 'integer', example: 2 }, // id компании
                        vacancySkills: {
                            type: 'array',
                            items: { type: 'integer' }, // массив id навыков, если нужно
                            nullable: true,
                        },
                        applications: {
                            type: 'array',
                            items: { type: 'integer' }, // массив id заявок, nullable
                            nullable: true,
                        },
                        motivationLetters: {
                            type: 'array',
                            items: { type: 'integer' }, // массив id мотивационных писем, nullable
                            nullable: true,
                        },
                    },
                },

                VacancyInput: {
                    type: 'object',
                    required: ['title', 'company'],
                    properties: {
                        title: { type: 'string', example: 'Frontend Developer' },
                        description: { type: 'string', example: 'Разработка интерфейсов...', nullable: true },
                        industry: { type: 'string', example: 'IT', nullable: true },
                        requirements: { type: 'string', example: 'Опыт работы от 3 лет', nullable: true },
                        salary: { type: 'integer', example: 70000, nullable: true },
                        work_exp: { type: 'string', example: '3 года', nullable: true },
                        companyId: { type: 'integer', example: 2 }, // id компании
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
