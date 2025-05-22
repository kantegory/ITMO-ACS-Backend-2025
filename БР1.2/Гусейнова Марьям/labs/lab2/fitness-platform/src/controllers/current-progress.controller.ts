import { Request, Response } from 'express';
import { CurrentProgressService } from '../services/current-progress.service';

const currentProgressService = new CurrentProgressService();

export class CurrentProgressController {

  getMyCurrentProgress = async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      const currentProgress = await currentProgressService.getMyCurrentProgress(userId);
      if (currentProgress) {
        res.json(currentProgress);
      } else {
        res.status(404).json({ message: 'Current progress not found for this user' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch current progress' });
    }
  };

  getAllCurrentProgress = async (req: Request, res: Response) => {
    try {
      const currentProgresses = await currentProgressService.getAllCurrentProgress();
      res.json(currentProgresses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch current progresses' });
    }
  };

  getCurrentProgressById = async (req: Request, res: Response) => {
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
  };

  getCurrentProgressByUserId = async (req: Request, res: Response) => {
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
  };

  createCurrentProgress = async (req: Request, res: Response) => {
    try {
      const newCurrentProgress = await currentProgressService.createCurrentProgress(req.body);
      res.status(201).json(newCurrentProgress);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create current progress' });
    }
  };

  updateCurrentProgress = async (req: Request, res: Response) => {
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
  };

  deleteCurrentProgress = async (req: Request, res: Response) => {
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
  };
}