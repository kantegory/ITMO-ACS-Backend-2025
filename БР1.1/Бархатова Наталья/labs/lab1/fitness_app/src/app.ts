import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { AppDataSource } from "./AppDataSource";
import dotenv from "dotenv";

dotenv.config();

import { AuthController } from "./controllers/AuthController";
import { PostController } from "./controllers/PostController";
import { UserController } from "./controllers/UserController";
import { WorkoutController } from "./controllers/WorkoutController";
import { TrainingPlanController } from "./controllers/TrainingPlanController";
import { ProgressController } from "./controllers/ProgressController";
import { UserDetailsController } from "./controllers/UserDetailsController";

const PORT = process.env.PORT || 3000;

const app = createExpressServer({
  controllers: [
    AuthController,
    PostController,
    UserController,
    WorkoutController,
    TrainingPlanController,
    ProgressController,
    UserDetailsController,
  ],
  routePrefix: "/api",
  cors: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error("Database connection error:", error));
