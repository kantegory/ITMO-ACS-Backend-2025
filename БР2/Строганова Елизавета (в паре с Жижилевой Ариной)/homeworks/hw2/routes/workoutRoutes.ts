import express from 'express';
import {
  createWorkout,
  getWorkout,
  updateWorkout,
  deleteWorkout,
  listWorkouts
} from '../controllers/workoutController';

const router = express.Router();

router.post('/workouts', createWorkout);
router.get('/workouts/:id', getWorkout);
router.put('/workouts/:id', updateWorkout);
router.delete('/workouts/:id', deleteWorkout);
router.get('/workouts', listWorkouts);

export default router;
