import appConfig from './config';
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppDataSource } from './data-source';
import workoutPlanRoutes from './routes/workout-plan.routes';
import planProgressRoutes from './routes/plan-progress.routes';
import exerciseProgressRoutes from './routes/exercise-progress.routes';
import workoutInPlanRoutes from './routes/workout-in-plan.routes';
import { CustomError } from './utils/custom-error.util';

const app = express();
const PORT = appConfig.port;

app.use(express.json());

app.use('/plans', workoutPlanRoutes);
app.use('/plan-progress', planProgressRoutes);
app.use('/exercise-progress', exerciseProgressRoutes);
app.use('/workout-in-plan', workoutInPlanRoutes);

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
      console.log(`Plan & Progress Service is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log('TypeORM connection error in Plan & Progress Service: ', error);
  });