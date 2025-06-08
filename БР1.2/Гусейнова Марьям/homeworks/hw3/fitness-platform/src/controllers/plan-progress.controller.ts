import { Request, Response } from 'express';
import { PlanProgressService } from '../services/plan-progress.service';

const planProgressService = new PlanProgressService();

export class PlanProgressController {

  getAllMyPlanProgresses = async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      const progresses = await planProgressService.getAllMyPlanProgresses(userId);
      res.json(progresses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch user plan progresses' });
    }
  };

  getMyPlanProgressesByPlan = async (req: Request, res: Response) => {
    const planId = parseInt(req.params.planId, 10);
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      if (isNaN(planId)) {
        return res.status(400).json({ message: 'Invalid plan ID' });
      }
      const progresses = await planProgressService.getMyPlanProgressesByPlan(userId, planId);
      res.json(progresses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch user plan progresses for specific plan' });
    }
  };

  getAllPlanProgress = async (req: Request, res: Response) => {
    try {
      const planProgresses = await planProgressService.getAllPlanProgress();
      res.json(planProgresses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch plan progresses' });
    }
  };

  getPlanProgressById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const planProgress = await planProgressService.getPlanProgressById(id);
      if (planProgress) {
        res.json(planProgress);
      } else {
        res.status(404).json({ message: 'Plan progress not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch plan progress' });
    }
  };

  createPlanProgress = async (req: Request, res: Response) => {
    try {
      const newPlanProgress = await planProgressService.createPlanProgress(req.body);
      res.status(201).json(newPlanProgress);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create plan progress' });
    }
  };

  updatePlanProgress = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const updatedPlanProgress = await planProgressService.updatePlanProgress(id, req.body);
      if (updatedPlanProgress) {
        res.json(updatedPlanProgress);
      } else {
        res.status(404).json({ message: 'Plan progress not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update plan progress' });
    }
  };

  deletePlanProgress = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const success = await planProgressService.deletePlanProgress(id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Plan progress not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete plan progress' });
    }
  };
}