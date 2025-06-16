import { Request, Response } from 'express';
import { ExerciseService } from '../services/exercise.service';
import { CustomError } from '../utils/custom-error.util';

const exerciseService = new ExerciseService();

export class ExerciseController {
  getAllExercises = async (req: Request, res: Response) => {
    const exercises = await exerciseService.getAllExercises();
    res.json(exercises);
  };

  getExerciseById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid exercise ID format', 400);
    }
    const exercise = await exerciseService.getExerciseById(id);
    res.json(exercise);
  };

  createExercise = async (req: Request, res: Response) => {
    const newExercise = await exerciseService.createExercise(req.body);
    res.status(201).json(newExercise);
  };

  updateExercise = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid exercise ID format', 400);
    }
    const updatedExercise = await exerciseService.updateExercise(id, req.body);
    res.json(updatedExercise);
  };

  deleteExercise = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid exercise ID format', 400);
    }
    await exerciseService.deleteExercise(id);
    res.status(204).send();
  };

  // метод для внутренних запросов без аутентификации
  getExerciseByIdInternal = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid exercise ID format', 400);
    }
    // Используем try-catch, так как этот метод должен вернуть { exists: false } вместо 404 ошибки
    try {
        await exerciseService.getExerciseById(id);
        res.status(200).json({ exists: true });
    } catch (error) {
        if (error instanceof CustomError && error.statusCode === 404) {
            res.status(404).json({ exists: false, message: 'Exercise not found' });
        } else {
            throw error;
        }
    }
  };  
}