import { Request, Response } from 'express';
import { ExerciseService } from '../services/exercise.service';

const exerciseService = new ExerciseService();

export class ExerciseController {
  getAllExercises = async (req: Request, res: Response) => {
    try {
      const exercises = await exerciseService.getAllExercises();
      res.json(exercises);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch exercises' });
    }
  };

  getExerciseById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const exercise = await exerciseService.getExerciseById(id);
      if (exercise) {
        res.json(exercise);
      } else {
        res.status(404).json({ message: 'Exercise not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch exercise' });
    }
  };

  createExercise = async (req: Request, res: Response) => {
    try {
      const newExercise = await exerciseService.createExercise(req.body);
      res.status(201).json(newExercise);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create exercise' });
    }
  };

  updateExercise = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const updatedExercise = await exerciseService.updateExercise(id, req.body);
      if (updatedExercise) {
        res.json(updatedExercise);
      } else {
        res.status(404).json({ message: 'Exercise not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update exercise' });
    }
  };

  deleteExercise = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const success = await exerciseService.deleteExercise(id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Exercise not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete exercise' });
    }
  };
}