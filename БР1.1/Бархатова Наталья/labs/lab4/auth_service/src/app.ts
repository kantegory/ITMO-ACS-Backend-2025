import "reflect-metadata";
import { createExpressServer, getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();

import { AuthController } from "./controllers/AuthController";

const PORT = process.env.PORT || 3000;

const app = createExpressServer({
  controllers: [
    AuthController,
  ],
  routePrefix: "/api",
  cors: true,
});

const storage = getMetadataArgsStorage();

const spec = routingControllersToSpec(storage, {
  routePrefix: "/api",
}, {
  info: {
    title: "Fitness App API. Микросервис аутентификации",
    version: "1.0.0",
    description: "Документация API для Fitness App - Микросервис аутентификации",
  },
  servers: [
    {
      url: `http://localhost:${PORT}/api`,
      description: "Локальный сервер",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      }
    }
  },
  security: [{ bearerAuth: [] }],
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
});
