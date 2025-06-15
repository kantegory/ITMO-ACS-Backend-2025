import "reflect-metadata";
import express from "express";
import { useExpressServer } from "routing-controllers";
import { AppDataSource } from "./data-source";
import { useSwagger } from "./swagger";
import { BlogCommentController } from "./controllers/blogCommentController";
import { AuthController } from "./controllers/authController";
import { BlogPostController } from "./controllers/blogPostController";
import { UserController } from "./controllers/userController";
import { OrderController } from "./controllers/orderController";
import { PaymentController } from "./controllers/paymentController";
import { RoleController } from "./controllers/roleController";
import { WorkoutController } from "./controllers/workoutController";
import { TrainingPlanController } from "./controllers/trainingPlanController";
import { UserTrainingPlanController } from "./controllers/userTrainingPlanController";
import { UserProgressController } from "./controllers/userProgressController";
import { TrainingPlanWorkoutController } from "./controllers/trainingPlanWorkoutController";
import { authorizationChecker } from "./utils/authCheck";

const app = express();

AppDataSource.initialize()
  .then(() => {
    console.log("DB connected");
    
    useExpressServer(app, {
      controllers: [
        BlogCommentController,
        AuthController,
        BlogPostController,
        UserController,
        OrderController,
        PaymentController,
        RoleController,
        WorkoutController,
        TrainingPlanController,
        UserTrainingPlanController,
        UserProgressController,
        TrainingPlanWorkoutController,
      ],
      routePrefix: "",
      cors: true,
      defaultErrorHandler: true,
      validation: {
        whitelist: true,
        forbidNonWhitelisted: true,
      },
      authorizationChecker,
      currentUserChecker: async (action) => {
        return action.request.user;
      },
    });

    useSwagger(app, {
      controllers: [
        BlogCommentController,
        AuthController,
        BlogPostController,
        UserController,
        OrderController,
        PaymentController,
        RoleController,
        WorkoutController,
        TrainingPlanController,
        UserTrainingPlanController,
        UserProgressController,
        TrainingPlanWorkoutController,
      ],
    });

    app.listen(3000, () => {
      console.log("🚀 Server running at http://localhost:3000");
    });
  })
  .catch((error) => console.log("DB connection error:", error));