import express from 'express';
import { ExerciseWorkoutController } from '../controllers/exercise-workout.controller';

const router = express.Router();
const exerciseWorkoutController = new ExerciseWorkoutController();

router.get('/', exerciseWorkoutController.getAllExerciseWorkouts);
router.get('/:id', exerciseWorkoutController.getExerciseWorkoutById);
router.post('/', exerciseWorkoutController.createExerciseWorkout);
router.put('/:id', exerciseWorkoutController.updateExerciseWorkout);
router.delete('/:id', exerciseWorkoutController.deleteExerciseWorkout);

export default router;