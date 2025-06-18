import { Router } from 'express';
import { getWorkoutPlans, getWorkoutPlanById, createWorkoutPlan, updateWorkoutPlan, deleteWorkoutPlan } from '../controllers/WorkoutPlanController';

const workoutPlanRouter = Router();

workoutPlanRouter.get('/', getWorkoutPlans);
workoutPlanRouter.get('/:id', (req, res, next) => {
  getWorkoutPlanById(req, res).catch(next);
});
workoutPlanRouter.post('/', createWorkoutPlan);
workoutPlanRouter.put('/:id', updateWorkoutPlan);
workoutPlanRouter.delete('/:id', deleteWorkoutPlan);

export default workoutPlanRouter;