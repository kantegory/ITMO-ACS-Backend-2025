import { Router } from 'express';
import { ExerciseWorkoutController } from '../controllers/exercise-workout.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/async-handler'; 

const router = Router();
const exerciseWorkoutController = new ExerciseWorkoutController();

router.get('/', authMiddleware, asyncHandler(exerciseWorkoutController.getAllExerciseWorkouts));
router.get('/:id', authMiddleware, asyncHandler(exerciseWorkoutController.getExerciseWorkoutById));
router.post('/', authMiddleware, asyncHandler(exerciseWorkoutController.createExerciseWorkout));
router.put('/:id', authMiddleware, asyncHandler(exerciseWorkoutController.updateExerciseWorkout));
router.delete('/:id', authMiddleware, asyncHandler(exerciseWorkoutController.deleteExerciseWorkout));

export default router;