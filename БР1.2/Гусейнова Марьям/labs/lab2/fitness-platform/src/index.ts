import { config } from 'dotenv';
config(); // Загружает переменные из .env файла в process.env

import express from "express";
import userRoutes from "./routes/user.routes";
import blogPostRoutes from "./routes/blogPost.routes";
import workoutRoutes from './routes/workout.routes';
import planProgressRoutes from './routes/plan-progress.routes';
import workoutPlanRoutes from './routes/workout-plan.routes';
import workoutInPlanRoutes from './routes/workout-in-plan.routes';
import currentProgressRoutes from './routes/current-progress.routes';
import exerciseRoutes from './routes/exercise.routes';
import exerciseProgressRoutes from './routes/exercise-progress.routes';
import exerciseWorkoutRoutes from './routes/exercise-workout.routes';
import { AppDataSource } from "./data-source";

const app = express();
const PORT = process.env.PORT

app.use(express.json());

app.use("/", userRoutes);
app.use("/blogposts", blogPostRoutes);
app.use('/workouts', workoutRoutes);
app.use('/plan-progress', planProgressRoutes);
app.use('/plans', workoutPlanRoutes);
app.use('/workout-in-plans', workoutInPlanRoutes);
app.use('/current-progress', currentProgressRoutes);
app.use('/exercises', exerciseRoutes);
app.use('/exercise-progress', exerciseProgressRoutes);
app.use('/exercise-workouts', exerciseWorkoutRoutes);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log("TypeORM connection error: ", error));