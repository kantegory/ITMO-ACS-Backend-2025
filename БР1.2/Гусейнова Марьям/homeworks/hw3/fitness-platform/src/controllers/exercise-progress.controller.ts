import { Request, Response } from 'express';
import { ExerciseProgressService } from '../services/exercise-progress.service';

const exerciseProgressService = new ExerciseProgressService();

export class ExerciseProgressController {

  getAllMyExerciseProgresses = async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      const progresses = await exerciseProgressService.getAllMyExerciseProgresses(userId);
      res.json(progresses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch user exercise progresses' });
    }
  };

  getMyExerciseProgressesByExercise = async (req: Request, res: Response) => {
    const exerciseId = parseInt(req.params.exerciseId, 10);
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      if (isNaN(exerciseId)) {
        return res.status(400).json({ message: 'Invalid exercise ID' });
      }
      const progresses = await exerciseProgressService.getMyExerciseProgressesByExercise(userId, exerciseId);
      res.json(progresses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch user exercise progresses for specific exercise' });
    }
  };

  getAllExerciseProgress = async (req: Request, res: Response) => {
    try {
      const exerciseProgresses = await exerciseProgressService.getAllExerciseProgress();
      res.json(exerciseProgresses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch exercise progresses' });
    }
  };

  getExerciseProgressById = async (req: Request, res: Response) => {
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
  };

  createExerciseProgress = async (req: Request, res: Response) => {
    try {
      const newExerciseProgress = await exerciseProgressService.createExerciseProgress(req.body);
      res.status(201).json(newExerciseProgress);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create exercise progress' });
    }
  };

  updateExerciseProgress = async (req: Request, res: Response) => {
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
  };

  deleteExerciseProgress = async (req: Request, res: Response) => {
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
  };
}