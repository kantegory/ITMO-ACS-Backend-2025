import { Request, Response } from 'express';
import { ExerciseProgressService } from '../services/exercise-progress.service';

const exerciseProgressService = new ExerciseProgressService();

export class ExerciseProgressController {
  async getAllExerciseProgress(req: Request, res: Response): Promise<void> {
    try {
      const exerciseProgresses = await exerciseProgressService.getAllExerciseProgress();
      res.json(exerciseProgresses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch exercise progresses' });
    }
  }

  async getExerciseProgressById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
      const exerciseProgress = await exerciseProgressService.getExerciseProgressById(id);
      if (exerciseProgress) {
        res.json(exerciseProgress);
      } else {
        res.status(404).json({ message: 'Exercise progress not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch exercise progress' });
    }
  }

  async createExerciseProgress(req: Request, res: Response): Promise<void> {
    try {
      const newExerciseProgress = await exerciseProgressService.createExerciseProgress(req.body);
      res.status(201).json(newExerciseProgress);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create exercise progress' });
    }
  }

  async updateExerciseProgress(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
      const updatedExerciseProgress = await exerciseProgressService.updateExerciseProgress(id, req.body);
      if (updatedExerciseProgress) {
        res.json(updatedExerciseProgress);
      } else {
        res.status(404).json({ message: 'Exercise progress not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update exercise progress' });
    }
  }

  async deleteExerciseProgress(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
      const success = await exerciseProgressService.deleteExerciseProgress(id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Exercise progress not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete exercise progress' });
    }
  }
}