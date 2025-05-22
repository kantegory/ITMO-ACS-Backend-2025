import { Router, Request, Response, RequestHandler } from 'express';
import { WorkoutPlanController } from '../controllers/workout-plan.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const workoutPlanController = new WorkoutPlanController();

router.get('/my-plans', authMiddleware, workoutPlanController.getAllMyWorkoutPlans as RequestHandler);
router.get('/', authMiddleware, workoutPlanController.getAllWorkoutPlans);
router.get('/:id', authMiddleware, workoutPlanController.getWorkoutPlanById);
router.post('/', authMiddleware, workoutPlanController.createWorkoutPlan);
router.put('/:id', authMiddleware, workoutPlanController.updateWorkoutPlan);
router.delete('/:id', authMiddleware, workoutPlanController.deleteWorkoutPlan);

export default router;