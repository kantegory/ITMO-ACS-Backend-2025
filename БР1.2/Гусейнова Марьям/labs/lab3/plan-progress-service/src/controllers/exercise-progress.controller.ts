import { Request, Response } from 'express';
import { ExerciseProgressService } from '../services/exercise-progress.service';
import { CustomError } from '../utils/custom-error.util';

const exerciseProgressService = new ExerciseProgressService();

export class ExerciseProgressController {

  getAllMyExerciseProgresses = async (req: Request, res: Response) => {
    const userId = req.userId;
    if (!userId) {
      throw new CustomError('Unauthorized: User ID missing', 401);
    }
    const progresses = await exerciseProgressService.getAllMyExerciseProgresses(userId);
    res.json(progresses);
  };

  getMyExerciseProgressesByExercise = async (req: Request, res: Response) => {
    const userId = req.userId;
    if (!userId) {
      throw new CustomError('Unauthorized: User ID missing', 401);
    }
    const exerciseId = parseInt(req.params.exerciseId, 10);
    if (isNaN(exerciseId)) {
      throw new CustomError('Invalid exercise ID format', 400);
    }
    const progresses = await exerciseProgressService.getMyExerciseProgressesByExercise(userId, exerciseId);
    res.json(progresses);
  };

  getAllExerciseProgress = async (req: Request, res: Response) => {
    const exerciseProgresses = await exerciseProgressService.getAllExerciseProgress();
    res.json(exerciseProgresses);
  };

  getExerciseProgressById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid exercise progress ID format', 400);
    }
    const exerciseProgress = await exerciseProgressService.getExerciseProgressById(id); // Сервис выбросит 404
    res.json(exerciseProgress);
  };

  createExerciseProgress = async (req: Request, res: Response) => {
    const userId = req.userId;
    if (!userId) {
      throw new CustomError('Unauthorized: User ID missing from Gateway', 401);
    }

    // Принудительно устанавливаем user_id из токена
    const exerciseProgressData = { ...req.body, user_id: userId };

    const { exercise_id, sets, reps } = exerciseProgressData;
    if (isNaN(exercise_id) || exercise_id <= 0) {
      throw new CustomError('exercise_id must be a positive number', 400);
    }
    if (isNaN(sets) || sets < 0) {
      throw new CustomError('sets must be a valid number (>=0)', 400);
    }
    if (isNaN(reps) || reps < 0) {
      throw new CustomError('reps must be a valid number (>=0)', 400);
    }
    
    const newExerciseProgress = await exerciseProgressService.createExerciseProgress(exerciseProgressData);
    res.status(201).json(newExerciseProgress);
  };

  updateExerciseProgress = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid exercise progress ID format', 400);
    }

    const userId = req.userId;
    if (!userId) {
      throw new CustomError('Unauthorized: User ID missing from Gateway', 401);
    }

    // Проверка, что пользователь обновляет свой прогресс упражнения
    const existingProgress = await exerciseProgressService.getExerciseProgressById(id);
    if (existingProgress.user_id !== userId) {
        throw new CustomError('Forbidden: You can only update your own exercise progress entries', 403);
    }

    // Принудительно сохраняем user_id, чтобы пользователь не мог переназначить прогресс
    const exerciseProgressData = { ...req.body, user_id: existingProgress.user_id };

    const { exercise_id, sets, reps } = exerciseProgressData;
    if (exercise_id !== undefined && (isNaN(exercise_id) || exercise_id <= 0)) {
      throw new CustomError('exercise_id (if provided) must be a positive number', 400);
    }
    if (sets !== undefined && (isNaN(sets) || sets < 0)) {
      throw new CustomError('sets (if provided) must be a valid number (>=0)', 400);
    }
    if (reps !== undefined && (isNaN(reps) || reps < 0)) {
      throw new CustomError('reps (if provided) must be a valid number (>=0)', 400);
    }

    const updatedExerciseProgress = await exerciseProgressService.updateExerciseProgress(id, exerciseProgressData);
    res.json(updatedExerciseProgress);
  };

  deleteExerciseProgress = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid exercise progress ID format', 400);
    }

    const userId = req.userId;
    if (!userId) {
      throw new CustomError('Unauthorized: User ID missing', 401);
    }

    // Проверка, что пользователь удаляет свой прогресс упражнения
    const existingProgress = await exerciseProgressService.getExerciseProgressById(id);
    if (existingProgress.user_id !== userId) {
        throw new CustomError('Forbidden: You can only delete your own exercise progress entries', 403);
    }
    
    await exerciseProgressService.deleteExerciseProgress(id);
    res.status(204).send();
  };
}