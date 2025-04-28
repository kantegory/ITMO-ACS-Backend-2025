import express from "express";
import userRoutes from "./routes/user.routes";
import blogPostRoutes from "./routes/blogPost.routes";
import userMeasurementsProgressRoutes from "./routes/userMeasurementsProgress.routes";
import workoutPlanRoutes from "./routes/workoutPlan.routes";
import workoutRoutes from "./routes/workout.routes";
import userWorkoutProgressRoutes from "./routes/userWorkoutProgress.routes";

const app = express();
app.use(express.json());

// Роуты
app.use("/users", userRoutes);
app.use("/posts", blogPostRoutes);
app.use("/measurements", userMeasurementsProgressRoutes);
app.use("/plans", workoutPlanRoutes);
app.use("/workouts", workoutRoutes);
app.use("/workout-progress", userWorkoutProgressRoutes);

export default app;
