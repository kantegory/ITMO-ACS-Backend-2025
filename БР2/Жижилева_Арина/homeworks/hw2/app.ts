import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import blogPostRoutes from './routes/blogPostRoutes';
import userWorkoutProgressRoutes from './routes/userWorkoutProgressRoutes';
import userMeasurementsProgressRoutes from './routes/userMeasurementsProgressRoutes';
import workoutPlanRoutes from './routes/workoutPlanRoutes';
import workoutRoutes from './routes/workoutRoutes';

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

export default app;

app.use('/api', blogPostRoutes);
app.use('/api', userWorkoutProgressRoutes);
app.use('/api', userMeasurementsProgressRoutes);
app.use('/api', workoutPlanRoutes);
app.use('/api', workoutRoutes);
app.use('/api', userRoutes);