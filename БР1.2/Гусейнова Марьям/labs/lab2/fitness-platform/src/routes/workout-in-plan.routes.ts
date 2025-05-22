import { Router } from 'express';
import { WorkoutInPlanController } from '../controllers/workout-in-plan.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const workoutInPlanController = new WorkoutInPlanController();

router.get('/', authMiddleware, workoutInPlanController.getAllWorkoutInPlans);
router.get('/:id', authMiddleware, workoutInPlanController.getWorkoutInPlanById);
router.post('/', authMiddleware, workoutInPlanController.createWorkoutInPlan);
router.put('/:id', authMiddleware, workoutInPlanController.updateWorkoutInPlan);
router.delete('/:id', authMiddleware, workoutInPlanController.deleteWorkoutInPlan);

export default router;