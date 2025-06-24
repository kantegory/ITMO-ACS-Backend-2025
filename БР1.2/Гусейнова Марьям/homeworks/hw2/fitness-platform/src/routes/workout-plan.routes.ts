import express from 'express';
import { WorkoutPlanController } from '../controllers/workout-plan.controller';

const router = express.Router();
const workoutPlanController = new WorkoutPlanController();

router.get('/', workoutPlanController.getAllWorkoutPlans);
router.get('/:id', workoutPlanController.getWorkoutPlanById);
router.post('/', workoutPlanController.createWorkoutPlan);
router.put('/:id', workoutPlanController.updateWorkoutPlan);
router.delete('/:id', workoutPlanController.deleteWorkoutPlan);

export default router;