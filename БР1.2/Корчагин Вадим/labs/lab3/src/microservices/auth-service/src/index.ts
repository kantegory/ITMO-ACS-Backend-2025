import "reflect-metadata";
import express from "express";
import { useExpressServer } from "routing-controllers";
import { AuthDataSource } from "./data-source";
import { useSwagger } from "./swagger";
import { AuthController } from "./controllers/authController";
import { UserController } from "./controllers/userController";
import { RoleController } from "./controllers/roleController";

const app = express();
const port = 3000;

AuthDataSource.initialize().then(() => {
  console.log("Auth DB connected");

  useExpressServer(app, {
    controllers: [AuthController, UserController, RoleController],
    routePrefix: "",
    cors: true,
    defaultErrorHandler: true,
  });

  useSwagger(app, {
    controllers: [AuthController, UserController, RoleController],
    serviceName: "Auth Service",
    port
  });

  app.listen(port, () => {
    console.log(`🚀 Auth service running at http://localhost:${port}`);
  });
});
