import { Router } from 'express';
import { ExerciseWorkoutController } from '../controllers/exercise-workout.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const exerciseWorkoutController = new ExerciseWorkoutController();

router.get('/', authMiddleware, exerciseWorkoutController.getAllExerciseWorkouts);
router.get('/:id', authMiddleware, exerciseWorkoutController.getExerciseWorkoutById);
router.post('/', authMiddleware, exerciseWorkoutController.createExerciseWorkout);
router.put('/:id', authMiddleware, exerciseWorkoutController.updateExerciseWorkout);
router.delete('/:id', authMiddleware, exerciseWorkoutController.deleteExerciseWorkout);

export default router;