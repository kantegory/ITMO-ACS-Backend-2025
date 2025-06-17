import { Router } from 'express';
import { getPlans, getPlanById, createPlan, updatePlan, deletePlan } from '../controllers/PlanController';

const planRouter = Router();

planRouter.get('/', getPlans);
planRouter.get('/:id', (req, res, next) => {
  getPlanById(req, res).catch(next);
});
planRouter.post('/', createPlan);
planRouter.put('/:id', updatePlan);
planRouter.delete('/:id', deletePlan);

export default planRouter;