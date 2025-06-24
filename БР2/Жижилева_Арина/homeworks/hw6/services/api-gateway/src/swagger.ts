import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fitness App API Gateway",
      version: "1.0.0",
      description: "API Gateway for Fitness App microservices. Access detailed API documentation at individual services: [User Service](http://localhost:3001/api-docs), [Workout Service](http://localhost:3002/api-docs), [Blog Service](http://localhost:3003/api-docs).",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "API Gateway",
      },
    ],
  },
  apis: [], // Пустой список, так как API Gateway не имеет собственных эндпоинтов
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;