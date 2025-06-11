import { Router } from 'express';
import { WorkoutPlanController } from '../controllers/workout-plan.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/async-handler';

const router = Router();
const workoutPlanController = new WorkoutPlanController();

router.get('/my-plans', authMiddleware, asyncHandler(workoutPlanController.getAllMyWorkoutPlans));
router.get('/', authMiddleware, asyncHandler(workoutPlanController.getAllWorkoutPlans));
router.get('/:id', authMiddleware, asyncHandler(workoutPlanController.getWorkoutPlanById));
router.post('/', authMiddleware, asyncHandler(workoutPlanController.createWorkoutPlan));
router.put('/:id', authMiddleware, asyncHandler(workoutPlanController.updateWorkoutPlan));
router.delete('/:id', authMiddleware, asyncHandler(workoutPlanController.deleteWorkoutPlan));

export default router;