import "reflect-metadata";
import express from "express";
import { useExpressServer } from "routing-controllers";
import { ProgressDataSource } from "./data-source";
import { useSwagger } from "./swagger";
import { UserProgressController } from "./controllers/userProgressController";
import { UserTrainingPlanController } from "./controllers/userTrainingPlanController";
import { connectToRabbitMQ } from "./common/rabbitmq";
import { config } from "dotenv";

config();

const app = express();
const host = process.env.HOST;
const port = parseInt(process.env.PORT);

async function bootstrap() {
  try {
    await ProgressDataSource.initialize();
    console.log("Progress DB connected");

    await connectToRabbitMQ();
    console.log("RabbitMQ connected");

    useExpressServer(app, {
      controllers: [UserProgressController, UserTrainingPlanController],
      routePrefix: "",
      cors: true,
      defaultErrorHandler: true,
    });

    useSwagger(app, {
      controllers: [UserProgressController, UserTrainingPlanController],
      serviceName: "Progress Service",
      port,
    });

    app.listen(port, () => {
      console.log(`🚀 Progress service running at http://${host}:${port}`);
    });
  } catch (error) {
    console.error("Failed to start Progress Service", error);
  }
}

bootstrap();