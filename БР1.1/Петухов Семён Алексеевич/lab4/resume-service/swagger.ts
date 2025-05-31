// src/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Resume-Service API',
            version: '1.0.0',
            description: 'Документация для микросервиса резюме',
        },
        servers: [
            {
                url: 'http://localhost:3000/resume-service/', // URL вашего сервера
            },
        ],
        components: {
            schemas: {
                Education: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        education_level: {
                            type: 'string',
                            example: 'Высшее',
                        },
                    },
                },

                EducationInput: {
                    type: 'object',
                    required: ['education_level'],
                    properties: {
                        education_level: {
                            type: 'string',
                            example: 'Среднее специальное',
                        },
                    },
                },

                ResumeSkills: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        resume: {
                            type: 'integer',
                            example: 3,
                        },
                        skillId: {
                            type: 'integer',
                            example: 7,
                        },
                    },
                },

                ResumeSkillsInput: {
                    type: 'object',
                    required: ['resume', 'skill'],
                    properties: {
                        resume: {
                            type: 'integer',
                            example: 3,
                        },
                        skillId: {
                            type: 'integer',
                            example: 7,
                        },
                    },
                },

                Resume: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        userId: { type: 'integer', example: 2 },
                        full_name: { type: 'string', example: 'Иван Иванов' },
                        date_of_birth: { type: 'string', format: 'date', example: '1990-05-10' },
                        work_experience: { type: 'string', example: '5 лет в разработке' },
                        skills: { type: 'string', nullable: true, example: 'JavaScript, TypeScript, Node.js' },
                        salary: { type: 'integer', nullable: true, example: 70000 },
                        education: { type: 'integer', nullable: true, example: 1 },
                        additional_information: { type: 'string', nullable: true, example: 'Готов к переезду' },
                        // Связанные сущности (опционально, можно убрать или расширить)
                        experiences: { type: 'array', items: { type: 'integer' }, example: [1, 2] },
                        resumeSkills: { type: 'array', items: { type: 'integer' }, example: [5, 7] },
                    },
                },

                ResumeInput: {
                    type: 'object',
                    required: ['user', 'full_name', 'date_of_birth', 'work_experience'],
                    properties: {
                        userId: { type: 'integer', example: 2 },
                        full_name: { type: 'string', example: 'Иван Иванов' },
                        date_of_birth: { type: 'string', format: 'date', example: '1990-05-10' },
                        work_experience: { type: 'string', example: '5 лет в разработке' },
                        skills: { type: 'string', nullable: true, example: 'JavaScript, TypeScript, Node.js' },
                        salary: { type: 'integer', nullable: true, example: 70000 },
                        education: { type: 'integer', nullable: true, example: 1 },
                        additional_information: { type: 'string', nullable: true, example: 'Готов к переезду' },
                    },
                },

                WorkExperience: {
                    type: "object",
                    properties: {
                        id: { type: "integer", example: 1 },
                        resume: { type: "integer", example: 5 }, // id резюме
                        company: { type: "string", example: "ООО Рога и Копыта", nullable: true },
                        role: { type: "string", example: "Инженер-программист", nullable: true },
                        description: { type: "string", example: "Разработка и сопровождение ПО", nullable: true },
                        duration: { type: "string", example: "2 года" }
                    },
                    required: ["id", "resume", "duration"]
                },

                WorkExperienceInput: {
                    type: "object",
                    required: ["resume", "duration"],
                    properties: {
                        resume: { type: "integer", example: 5 },
                        company: { type: "string", example: "ООО Рога и Копыта", nullable: true },
                        role: { type: "string", example: "Инженер-программист", nullable: true },
                        description: { type: "string", example: "Разработка и сопровождение ПО", nullable: true },
                        duration: { type: "string", example: "2 года" }
                    }
                },
            },
        },
    },
    apis: ['./routes/*.ts'], // путь к вашим файлам с аннотациями swagger
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
