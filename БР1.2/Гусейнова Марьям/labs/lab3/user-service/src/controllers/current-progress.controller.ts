import { Request, Response } from 'express';
import { CurrentProgressService } from '../services/current-progress.service';
import { CustomError } from '../utils/custom-error.util';

const currentProgressService = new CurrentProgressService();

export class CurrentProgressController {

  getMyCurrentProgress = async (req: Request, res: Response) => {
    const userId = req.userId;
    // authMiddleware уже проверит аутентификацию. Если userId здесь null,
    // значит что-то не так с middleware, но мы все равно выбросим ошибку
    if (!userId) {
      throw new CustomError("User not authenticated", 401);
    }
    const currentProgress = await currentProgressService.getMyCurrentProgress(userId);
    res.json(currentProgress);
  };

  getAllCurrentProgress = async (req: Request, res: Response) => {
    const currentProgresses = await currentProgressService.getAllCurrentProgress();
    res.json(currentProgresses);
  };

  getCurrentProgressById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid progress ID format', 400);
    }
    const currentProgress = await currentProgressService.getCurrentProgressById(id);
    res.json(currentProgress);
  };

  getCurrentProgressByUserId = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
      throw new CustomError('Invalid user ID format', 400);
    }
    const currentProgress = await currentProgressService.getCurrentProgressByUserId(userId);
    res.json(currentProgress);
  };

  createCurrentProgress = async (req: Request, res: Response) => {
    if (!req.body.user_id) {
        throw new CustomError('User ID is required in request body', 400);
    }
    const newCurrentProgress = await currentProgressService.createCurrentProgress(req.body);
    res.status(201).json(newCurrentProgress);
  };

  updateCurrentProgress = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
      throw new CustomError('Invalid user ID format', 400);
    }
    const updatedCurrentProgress = await currentProgressService.updateCurrentProgress(userId, req.body);
    res.json(updatedCurrentProgress);
  };

  deleteCurrentProgress = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
      throw new CustomError('Invalid user ID format', 400);
    }
    await currentProgressService.deleteCurrentProgress(userId);
    res.status(204).send();
  };
}