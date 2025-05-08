import express from 'express';
import {
  createPlan,
  getPlan,
  updatePlan,
  deletePlan,
  listPlans
} from '../controllers/workoutPlanController';

const router = express.Router();

router.post('/plans', createPlan);
router.get('/plans/:id', getPlan);
router.put('/plans/:id', updatePlan);
router.delete('/plans/:id', deletePlan);
router.get('/plans', listPlans);

export default router;
