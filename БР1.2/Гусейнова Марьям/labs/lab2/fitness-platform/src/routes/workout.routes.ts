import { Router } from 'express';
import { WorkoutController } from '../controllers/workout.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const workoutController = new WorkoutController();

router.get('/search', authMiddleware, workoutController.searchWorkout);
router.get('/', authMiddleware, workoutController.getAllWorkouts);
router.get('/:id', authMiddleware, workoutController.getWorkoutById);
router.post('/', authMiddleware, workoutController.createWorkout);
router.put('/:id', authMiddleware, workoutController.updateWorkout);
router.delete('/:id', authMiddleware, workoutController.deleteWorkout);

export default router;