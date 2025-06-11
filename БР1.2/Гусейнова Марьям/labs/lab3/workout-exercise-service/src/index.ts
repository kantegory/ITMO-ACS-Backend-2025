import appConfig from './config';
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppDataSource } from './data-source';
import workoutRoutes from './routes/workout.routes';
import exerciseRoutes from './routes/exercise.routes';
import exerciseWorkoutRoutes from './routes/exercise-workout.routes';
import { CustomError } from './utils/custom-error.util';

const app = express();
const PORT = appConfig.port;

app.use(express.json());

app.use('/workouts', workoutRoutes);
app.use('/exercises', exerciseRoutes);
app.use('/exercise-workouts', exerciseWorkoutRoutes);

// Централизованный обработчик ошибок
const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof CustomError) {
    console.error(`[${req.originalUrl}] Custom Error ${err.statusCode}: ${err.message}`);
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  // Для всех остальных ошибок (не пойманных CustomError или необработанных)
  console.error(`[${req.originalUrl}] Unhandled Server Error:`, err);
  res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  return;
};

app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Workout & Exercise Service is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log('TypeORM connection error in Workout & Exercise Service: ', error));