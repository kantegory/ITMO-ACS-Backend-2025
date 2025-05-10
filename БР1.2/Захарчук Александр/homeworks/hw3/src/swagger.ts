import * as swaggerJSDoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Recipe API",
      version: "1.0.0",
      description: "API для управления рецептами",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            username: { type: "string" },
            email: { type: "string" },
            profile_picture: { type: "string" },
            bio: { type: "string" },
          }
        },
        Recipe: {
          type: "object",
          properties: {
            recipe_id: { type: "integer" },
            title: { type: "string" },
            description: { type: "string" }
          }
        },
        Comment: {
          type: "object",
          properties: {
            comment_id: { type: "integer" },
            text: { type: "string" },
            user: { $ref: "#/components/schemas/User" },
            recipe: { $ref: "#/components/schemas/Recipe" }
          }
        }
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}
