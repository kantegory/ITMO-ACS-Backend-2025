import { getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { Application } from "express";
import * as swaggerUi from "swagger-ui-express";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { defaultMetadataStorage } from "class-transformer/cjs/storage";

/**
 * @param app
 * @param options
 */
export function useSwagger(app: Application, options?: { controllers: any[] }) {
  try {
    const schemas = validationMetadatasToSchemas({
      classTransformerMetadataStorage: defaultMetadataStorage,
      refPointerPrefix: "#/components/schemas/",
    });

    const storage = getMetadataArgsStorage();

    const spec = routingControllersToSpec(
      storage,
      {
        controllers: options?.controllers || [],
        defaultErrorHandler: false,
      },
      {
        components: {
          schemas,
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        security: [{ bearerAuth: [] }],
        info: {
          title: "Fitness API",
          version: "1.0.0",
          description: "API documentation for the Fitness application",
        },
        servers: [
          {
            url: "http://localhost:3000",
            description: "Local server",
          },
        ],
      }
    );
    
    app.get("/swagger.json", (_req, res) => {
      res.json(spec);
    });
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));
  } catch (error) {
    console.error("Error setting up Swagger:", error);
  }
}
