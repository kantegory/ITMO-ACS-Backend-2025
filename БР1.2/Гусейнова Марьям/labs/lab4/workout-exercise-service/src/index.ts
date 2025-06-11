import { config } from 'dotenv';
config();

import express from 'express';
import { AppDataSource } from './data-source';
import workoutRoutes from './routes/workout.routes';
import exerciseRoutes from './routes/exercise.routes';
import exerciseWorkoutRoutes from './routes/exercise-workout.routes';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

app.use('/workouts', workoutRoutes);
app.use('/exercises', exerciseRoutes);
app.use('/exercise-workouts', exerciseWorkoutRoutes);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Workout & Exercise Service is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log('TypeORM connection error in Workout & Exercise Service: ', error));