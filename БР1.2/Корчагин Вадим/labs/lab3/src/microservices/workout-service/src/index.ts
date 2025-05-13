import "reflect-metadata";
import express from "express";
import { useExpressServer } from "routing-controllers";
import { WorkoutDataSource } from "./data-source";
import { useSwagger } from "./swagger";
import { WorkoutController } from "./controllers/workoutController";
import { TrainingPlanController } from "./controllers/trainingPlanController";
import { TrainingPlanWorkoutController } from "./controllers/trainingPlanWorkoutController";

const app = express();
const port = 3001;

WorkoutDataSource.initialize().then(() => {
  console.log("Workout DB connected");

  useExpressServer(app, {
    controllers: [WorkoutController, TrainingPlanController, TrainingPlanWorkoutController],
    routePrefix: "",
    cors: true,
    defaultErrorHandler: true,
  });

  useSwagger(app, {
    controllers: [WorkoutController, TrainingPlanController, TrainingPlanWorkoutController],
    serviceName: "Workout Service",
    port
  });

  app.listen(port, () => {
    console.log(`🚀 Workout service running at http://localhost:${port}`);
  });
});
