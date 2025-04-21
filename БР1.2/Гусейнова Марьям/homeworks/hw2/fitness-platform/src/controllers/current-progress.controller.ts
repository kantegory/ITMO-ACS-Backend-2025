import { Request, Response } from 'express';
import { CurrentProgressService } from '../services/current-progress.service';

const currentProgressService = new CurrentProgressService();

export class CurrentProgressController {
  async getAllCurrentProgress(req: Request, res: Response): Promise<void> {
    try {
      const currentProgresses = await currentProgressService.getAllCurrentProgress();
      res.json(currentProgresses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch current progresses' });
    }
  }

  async getCurrentProgressById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
      const currentProgress = await currentProgressService.getCurrentProgressById(id);
      if (currentProgress) {
        res.json(currentProgress);
      } else {
        res.status(404).json({ message: 'Current progress not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch current progress' });
    }
  }

  async getCurrentProgressByUserId(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.userId, 10);
    try {
      const currentProgress = await currentProgressService.getCurrentProgressByUserId(userId);
      if (currentProgress) {
        res.json(currentProgress);
      } else {
        res.status(404).json({ message: 'Current progress not found for this user' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch current progress for user' });
    }
  }

  async createCurrentProgress(req: Request, res: Response): Promise<void> {
    try {
      const newCurrentProgress = await currentProgressService.createCurrentProgress(req.body);
      res.status(201).json(newCurrentProgress);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create current progress' });
    }
  }

  async updateCurrentProgress(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.userId, 10);
    try {
      const updatedCurrentProgress = await currentProgressService.updateCurrentProgress(userId, req.body);
      if (updatedCurrentProgress) {
        res.json(updatedCurrentProgress);
      } else {
        res.status(404).json({ message: 'Current progress not found for this user' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update current progress' });
    }
  }

  async deleteCurrentProgress(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.userId, 10);
    try {
      const success = await currentProgressService.deleteCurrentProgress(userId);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Current progress not found for this user' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete current progress' });
    }
  }
}