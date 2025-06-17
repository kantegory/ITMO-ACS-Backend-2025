import { Router } from 'express';
import { getWorkouts, getWorkoutById, createWorkout, updateWorkout, deleteWorkout } from '../controllers/WorkoutController';

const workoutRouter = Router();

workoutRouter.get('/', getWorkouts);
workoutRouter.get('/:id', (req, res, next) => {
  getWorkoutById(req, res).catch(next);
});
workoutRouter.post('/', createWorkout);
workoutRouter.put('/:id', updateWorkout);
workoutRouter.delete('/:id', deleteWorkout);

export default workoutRouter;