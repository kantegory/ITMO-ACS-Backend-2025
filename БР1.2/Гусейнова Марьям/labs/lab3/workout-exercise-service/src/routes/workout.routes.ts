import { Router } from 'express';
import { WorkoutController } from '../controllers/workout.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/async-handler'; 

const router = Router();
const workoutController = new WorkoutController();

router.get('/search', authMiddleware, asyncHandler(workoutController.searchWorkout));
router.get('/', authMiddleware, asyncHandler(workoutController.getAllWorkouts));
router.get('/:id', authMiddleware, asyncHandler(workoutController.getWorkoutById));
router.post('/', authMiddleware, asyncHandler(workoutController.createWorkout));
router.put('/:id', authMiddleware, asyncHandler(workoutController.updateWorkout));
router.delete('/:id', authMiddleware, asyncHandler(workoutController.deleteWorkout));

// Внутренний маршрут
router.get('/internal/exists/:id', asyncHandler(workoutController.getWorkoutByIdInternal));

export default router;