import express from 'express';
import { WorkoutInPlanController } from '../controllers/workout-in-plan.controller';

const router = express.Router();
const workoutInPlanController = new WorkoutInPlanController();

router.get('/', workoutInPlanController.getAllWorkoutInPlans);
router.get('/:id', workoutInPlanController.getWorkoutInPlanById);
router.post('/', workoutInPlanController.createWorkoutInPlan);
router.put('/:id', workoutInPlanController.updateWorkoutInPlan);
router.delete('/:id', workoutInPlanController.deleteWorkoutInPlan);

export default router;