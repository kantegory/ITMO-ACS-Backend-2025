// src/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Resume API',
            version: '1.0.0',
            description: 'Документация для API поиска вакансий',
        },
        servers: [
            {
                url: 'http://localhost:3000/api', // URL вашего сервера
            },
        ],
        components: {
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
                        resume: {
                            type: 'integer',
                            example: 3,
                        },
                        user: {
                            type: 'integer',
                            example: 2,
                        },
                        vacancy: {
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
                        resume: {
                            type: 'integer',
                            example: 3,
                        },
                        user: {
                            type: 'integer',
                            example: 2,
                        },
                        vacancy: {
                            type: 'integer',
                            example: 4,
                        },
                        status: {
                            type: 'string',
                            example: 'pending',
                        },
                    },
                },
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
                MotivationLetter: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        user: {
                            type: 'integer',
                            example: 2,
                        },
                        vacancy: {
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
                        user: {
                            type: 'integer',
                            example: 2,
                        },
                        vacancy: {
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
                        skill: {
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
                        skill: {
                            type: 'integer',
                            example: 7,
                        },
                    },
                },

                Resume: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        user: { type: 'integer', example: 2 },
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
                        user: { type: 'integer', example: 2 },
                        full_name: { type: 'string', example: 'Иван Иванов' },
                        date_of_birth: { type: 'string', format: 'date', example: '1990-05-10' },
                        work_experience: { type: 'string', example: '5 лет в разработке' },
                        skills: { type: 'string', nullable: true, example: 'JavaScript, TypeScript, Node.js' },
                        salary: { type: 'integer', nullable: true, example: 70000 },
                        education: { type: 'integer', nullable: true, example: 1 },
                        additional_information: { type: 'string', nullable: true, example: 'Готов к переезду' },
                    },
                },
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
                        company: { type: ['integer', 'null'], example: 3, nullable: true }, // id компании или null
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
                        company: { type: ['integer', 'null'], example: 3, nullable: true },
                    },
                },
                VacancySkills: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        vacancy: { type: 'integer', example: 5 }, // id вакансии
                        skill: { type: 'integer', example: 3 },   // id навыка
                    },
                },

                VacancySkillsInput: {
                    type: 'object',
                    required: ['vacancy', 'skill'],
                    properties: {
                        vacancy: { type: 'integer', example: 5 },
                        skill: { type: 'integer', example: 3 },
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
    apis: ['./src/routes/*.ts'], // путь к вашим файлам с аннотациями swagger
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
