import express from "express";
import userRoutes from "./routes/user.routes";
import blogPostRoutes from "./routes/blogPost.routes";
import userMeasurementsProgressRoutes from "./routes/userMeasurementsProgress.routes";
import workoutPlanRoutes from "./routes/workoutPlan.routes";
import workoutRoutes from "./routes/workout.routes";
import userWorkoutProgressRoutes from "./routes/userWorkoutProgress.routes";
import postLikeRoutes from "./routes/postLike.routes";
import postCommentRoutes from "./routes/postComment.routes";
import postTagRoutes from "./routes/postTag.routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

const app = express();
app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Роуты
app.use("/users", userRoutes);
app.use("/posts", blogPostRoutes);
app.use("/measurements", userMeasurementsProgressRoutes);
app.use("/plans", workoutPlanRoutes);
app.use("/workouts", workoutRoutes);
app.use("/workout-progress", userWorkoutProgressRoutes);
app.use("/like", postLikeRoutes);
app.use("/comment", postCommentRoutes);
app.use("/tag", postTagRoutes);

export default app;