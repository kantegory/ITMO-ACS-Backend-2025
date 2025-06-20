import { createExpressServer } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { getMetadataArgsStorage } from 'routing-controllers';
import * as swaggerUi from 'swagger-ui-express';
import { IngredientController } from './controllers/ingredient.controller';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { defaultMetadataStorage } from 'class-transformer/cjs/storage';
import { dataSource } from './data-source';
import { RecipeController } from './controllers/recipe.controller';

async function bootstrap() {
  await dataSource.initialize()
  const controllers = [IngredientController, RecipeController];

  const app = createExpressServer({
    controllers: controllers,
    cors: true,
    classTransformer: true,
    validation: true,
    defaultErrorHandler: true,
    currentUserChecker: async (action) => {
      return action.response.user;
    },
  });

  const schemas = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
  });

  const storage = getMetadataArgsStorage();
  const spec = routingControllersToSpec(
    storage,
    { controllers },
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
    info: {
        title: "Recipe Service API",
        version: "1.0.0",
    },
  });

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));
  app.get("/swagger.json", (_req, res) => { res.json(spec); });

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start server', err);
});
