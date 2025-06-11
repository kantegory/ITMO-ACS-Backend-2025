import { Router } from 'express';
import { PlanProgressController } from '../controllers/plan-progress.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/async-handler';

const router = Router();
const planProgressController = new PlanProgressController();

router.get('/my-plan-progresses', authMiddleware, asyncHandler(planProgressController.getAllMyPlanProgresses));
router.get('/my-plan-progresses/:planId', authMiddleware, asyncHandler(planProgressController.getMyPlanProgressesByPlan));
router.get('/', authMiddleware, asyncHandler(planProgressController.getAllPlanProgress));
router.get('/:id', authMiddleware, asyncHandler(planProgressController.getPlanProgressById));
router.post('/', authMiddleware, asyncHandler(planProgressController.createPlanProgress));
router.put('/:id', authMiddleware, asyncHandler(planProgressController.updatePlanProgress));
router.delete('/:id', authMiddleware, asyncHandler(planProgressController.deletePlanProgress));

export default router;