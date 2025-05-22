import { Router, Request, Response, RequestHandler } from 'express';
import { PlanProgressController } from '../controllers/plan-progress.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const planProgressController = new PlanProgressController();

router.get('/my-plan-progresses', authMiddleware, planProgressController.getAllMyPlanProgresses as RequestHandler);
router.get('/my-plan-progresses/:planId', authMiddleware, planProgressController.getMyPlanProgressesByPlan as RequestHandler);
router.get('/', authMiddleware, planProgressController.getAllPlanProgress);
router.get('/:id', authMiddleware, planProgressController.getPlanProgressById);
router.post('/', authMiddleware, planProgressController.createPlanProgress);
router.put('/:id', authMiddleware, planProgressController.updatePlanProgress);
router.delete('/:id', authMiddleware, planProgressController.deletePlanProgress);

export default router;