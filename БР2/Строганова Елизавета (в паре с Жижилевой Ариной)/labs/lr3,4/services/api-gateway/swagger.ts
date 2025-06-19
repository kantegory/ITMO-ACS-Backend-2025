import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fitness App API Gateway",
      version: "1.0.0",
      description: "API Gateway for Fitness App microservices",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "API Gateway",
      },
    ],
  },
  apis: [], // API Gateway не имеет собственных эндпоинтов, используйте swagger из сервисов
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;