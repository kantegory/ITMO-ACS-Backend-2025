import { Router } from 'express';
import { WorkoutInPlanController } from '../controllers/workout-in-plan.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/async-handler';


const router = Router();
const workoutInPlanController = new WorkoutInPlanController();

router.get('/', authMiddleware, asyncHandler(workoutInPlanController.getAllWorkoutInPlans));
router.get('/:id', authMiddleware, asyncHandler(workoutInPlanController.getWorkoutInPlanById));
router.post('/', authMiddleware, asyncHandler(workoutInPlanController.createWorkoutInPlan));
router.put('/:id', authMiddleware, asyncHandler(workoutInPlanController.updateWorkoutInPlan));
router.delete('/:id', authMiddleware, asyncHandler(workoutInPlanController.deleteWorkoutInPlan));

export default router;