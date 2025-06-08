import { config } from 'dotenv';
config(); // Загружает переменные из .env файла в process.env

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

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

// Настройки Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fitness Platform API',
      version: '1.0.0',
      description: 'API для платформы фитнес-тренировок',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    tags: [
      { name: 'Authentication', description: 'Авторизация и регистрация' },
      { name: 'Users', description: 'Управление пользователями' },
      { name: 'CurrentProgress', description: 'Управление общим прогрессом' },
      { name: 'WorkoutPlans', description: 'Управление планами тренировок' },
      { name: 'PlanProgress', description: 'Управление прогрессом планов' },
      { name: 'Workouts', description: 'Управление тренировками' },
      { name: 'WorkoutInPlans', description: 'Управление тренировками в планах' },
      { name: 'Exercises', description: 'Управление упражнениями' },
      { name: 'ExerciseWorkouts', description: 'Управление упражнениями в тренировках' },
      { name: 'ExerciseProgress', description: 'Управление прогрессом упражнений' },
      { name: 'BlogPosts', description: 'Управление блогом' }
    ]
  },
  apis: [
    './src/routes/*.ts',
    './src/swagger/*.ts'
  ]
};


const swaggerSpec = swaggerJsdoc(options);
console.log(swaggerSpec);

// Подключение Swagger UI к маршруту /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", userRoutes);
app.use("/blogposts", blogPostRoutes);
app.use('/workouts', workoutRoutes);
app.use('/plan-progress', planProgressRoutes);
app.use('/plans', workoutPlanRoutes);
app.use('/workout-in-plan', workoutInPlanRoutes);
app.use('/current-progress', currentProgressRoutes);
app.use('/exercises', exerciseRoutes);
app.use('/exercise-progress', exerciseProgressRoutes);
app.use('/exercise-workouts', exerciseWorkoutRoutes);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log("TypeORM connection error: ", error));