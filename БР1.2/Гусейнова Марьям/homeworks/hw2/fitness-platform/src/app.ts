import express, { Application } from 'express';
import userRoutes from './routes/user.routes';
import planProgressRoutes from './routes/plan-progress.routes';
import workoutPlanRoutes from './routes/workout-plan.routes';
import blogPostRoutes from './routes/blog-post.routes';
import workoutRoutes from './routes/workout.routes';
import workoutInPlanRoutes from './routes/workout-in-plan.routes';
import currentProgressRoutes from './routes/current-progress.routes';
import exerciseRoutes from './routes/exercise.routes';
import exerciseProgressRoutes from './routes/exercise-progress.routes';
import exerciseWorkoutRoutes from './routes/exercise-workout.routes';

const app: Application = express();
const port = 3000;

app.use(express.json());

app.use('/users', userRoutes);
app.use('/plan-progress', planProgressRoutes);
app.use('/workout-plans', workoutPlanRoutes);
app.use('/blog-posts', blogPostRoutes);
app.use('/workouts', workoutRoutes);
app.use('/workout-in-plans', workoutInPlanRoutes);
app.use('/current-progress', currentProgressRoutes);
app.use('/exercises', exerciseRoutes);
app.use('/exercise-progress', exerciseProgressRoutes);
app.use('/exercise-workouts', exerciseWorkoutRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;