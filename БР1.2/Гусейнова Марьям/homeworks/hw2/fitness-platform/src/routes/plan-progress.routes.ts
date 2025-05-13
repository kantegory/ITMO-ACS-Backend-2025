import express from 'express';
import { PlanProgressController } from '../controllers/plan-progress.controller';

const router = express.Router();
const planProgressController = new PlanProgressController();

router.get('/', planProgressController.getAllPlanProgress);
router.get('/:id', planProgressController.getPlanProgressById);
router.post('/', planProgressController.createPlanProgress);
router.put('/:id', planProgressController.updatePlanProgress);
router.delete('/:id', planProgressController.deletePlanProgress);

export default router;