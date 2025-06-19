import express from "express";
import workoutPlanRoutes from "./routes/workoutPlan.routes";
import workoutRoutes from "./routes/workout.routes";
import userWorkoutProgressRoutes from "./routes/userWorkoutProgress.routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

const app = express();
app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/plans", workoutPlanRoutes);
app.use("/workouts", workoutRoutes);
app.use("/workout-progress", userWorkoutProgressRoutes);

export default app;