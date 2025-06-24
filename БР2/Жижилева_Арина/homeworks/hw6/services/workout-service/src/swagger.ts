import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fitness App API",
      version: "1.0.0",
      description: "API documentation for the Fitness App backend",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/controllers/*.ts", "./src/routes/*.ts"], // Путь к файлам с JSDoc
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;