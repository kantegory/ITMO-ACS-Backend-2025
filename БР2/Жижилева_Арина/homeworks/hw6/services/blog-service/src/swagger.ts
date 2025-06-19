import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog Service API",
      version: "1.0.0",
      description: "API documentation for the Blog Service",
    },
    servers: [
      { url: "http://localhost:3003", description: "Blog Service" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/controllers/*.ts", "./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;