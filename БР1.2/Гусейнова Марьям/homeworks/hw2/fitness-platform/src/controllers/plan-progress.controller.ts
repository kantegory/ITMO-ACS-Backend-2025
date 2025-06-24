import { Request, Response } from 'express';
import { PlanProgressService } from '../services/plan-progress.service';

const planProgressService = new PlanProgressService();

export class PlanProgressController {
  async getAllPlanProgress(req: Request, res: Response): Promise<void> {
    try {
      const planProgresses = await planProgressService.getAllPlanProgress();
      res.json(planProgresses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch plan progresses' });
    }
  }

  async getPlanProgressById(req: Request, res: Response): Promise<void> {
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
  }

  async createPlanProgress(req: Request, res: Response): Promise<void> {
    try {
      const newPlanProgress = await planProgressService.createPlanProgress(req.body);
      res.status(201).json(newPlanProgress);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create plan progress' });
    }
  }

  async updatePlanProgress(req: Request, res: Response): Promise<void> {
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
  }

  async deletePlanProgress(req: Request, res: Response): Promise<void> {
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
  }
}