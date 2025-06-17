import express from 'express';
import userRouter from './routes/UserRoutes';
import workoutRouter from './routes/WorkoutRoutes';
import planRouter from './routes/PlanRoutes';
import workoutPlanRouter from './routes/WorkoutPlanRoutes';
import userProgressRouter from './routes/UserProgressRoutes';
import blogPostRouter from './routes/BlogPostRoutes';
import categoryRouter from './routes/CategoryRoutes';
import workoutCategoryRouter from './routes/WorkoutCategoryRoutes';

const app = express();
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/workouts', workoutRouter);
app.use('/api/plans', planRouter);
app.use('/api/workout-plans', workoutPlanRouter);
app.use('/api/user-progress', userProgressRouter);
app.use('/api/blog-posts', blogPostRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/workout-categories', workoutCategoryRouter);

export default app;