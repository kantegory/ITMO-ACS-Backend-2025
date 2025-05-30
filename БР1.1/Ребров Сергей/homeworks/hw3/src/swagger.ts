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
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: [
    './src/route/user.route.ts',
    './src/route/role.route.ts',
    './src/route/job.route.ts',
    './src/route/experience.route.ts',
    './src/route/education.route.ts',
    './src/route/resume.route.ts',
    './src/route/application.route.ts'
  ],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
