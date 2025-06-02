import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Service API",
      version: "1.0.0",
      description: "API documentation for the User Service",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "User Service",
      },
    ],
  },
  apis: ["./src/controllers/*.ts", "./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;