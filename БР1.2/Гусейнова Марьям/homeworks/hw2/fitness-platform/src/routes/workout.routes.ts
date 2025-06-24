import express from 'express';
import { WorkoutController } from '../controllers/workout.controller';

const router = express.Router();
const workoutController = new WorkoutController();

router.get('/', workoutController.getAllWorkouts);
router.get('/:id', workoutController.getWorkoutById);
router.post('/', workoutController.createWorkout);
router.put('/:id', workoutController.updateWorkout);
router.delete('/:id', workoutController.deleteWorkout);

export default router;