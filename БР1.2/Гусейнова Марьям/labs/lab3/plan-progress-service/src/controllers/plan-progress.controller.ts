import { Request, Response } from 'express';
import { PlanProgressService } from '../services/plan-progress.service';
import { CustomError } from '../utils/custom-error.util';

const planProgressService = new PlanProgressService();

export class PlanProgressController {

  getAllMyPlanProgresses = async (req: Request, res: Response) => {
    const userId = req.userId;
    if (!userId) {
      throw new CustomError('Unauthorized: User ID missing', 401);
    }
    const progresses = await planProgressService.getAllMyPlanProgresses(userId);
    res.json(progresses);
  };

  getMyPlanProgressesByPlan = async (req: Request, res: Response) => {
    const userId = req.userId;
    if (!userId) {
      throw new CustomError('Unauthorized: User ID missing', 401);
    }
    const planId = parseInt(req.params.planId, 10);
    if (isNaN(planId)) {
      throw new CustomError('Invalid plan ID format', 400);
    }
    const progresses = await planProgressService.getMyPlanProgressesByPlan(userId, planId);
    res.json(progresses);
  };

  getAllPlanProgress = async (req: Request, res: Response) => {
    const planProgresses = await planProgressService.getAllPlanProgress();
    res.json(planProgresses);
  };

  getPlanProgressById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid plan progress ID format', 400);
    }
    const planProgress = await planProgressService.getPlanProgressById(id);
    res.json(planProgress);
  };

  createPlanProgress = async (req: Request, res: Response) => {
    const userId = req.userId;
    if (!userId) {
      throw new CustomError('Unauthorized: User ID missing from Gateway', 401);
    }

    // Принудительно устанавливаем user_id из токена, чтобы пользователь не мог создать прогресс для другого юзера
    const planProgressData = { ...req.body, user_id: userId };

    const { plan_id, duration } = planProgressData;
    if (isNaN(plan_id) || plan_id <= 0) {
      throw new CustomError('plan_id must be a positive number', 400);
    }
    if (isNaN(duration) || duration <= 0) {
      throw new CustomError('duration must be a positive number', 400);
    }

    const newPlanProgress = await planProgressService.createPlanProgress(planProgressData);
    res.status(201).json(newPlanProgress);
  };

  updatePlanProgress = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid plan progress ID format', 400);
    }

    const userId = req.userId;
    if (!userId) {
      throw new CustomError('Unauthorized: User ID missing from Gateway', 401);
    }

    // Проверка, что пользователь обновляет свой прогресс плана
    const existingProgress = await planProgressService.getPlanProgressById(id);
    if (existingProgress.user_id !== userId) {
        throw new CustomError('Forbidden: You can only update your own plan progress entries', 403);
    }

    const planProgressData = { ...req.body, user_id: existingProgress.user_id };

    const { plan_id, duration } = planProgressData;
    if (plan_id !== undefined && (isNaN(plan_id) || plan_id <= 0)) {
      throw new CustomError('plan_id (if provided) must be a positive number', 400);
    }
    if (duration !== undefined && (isNaN(duration) || duration <= 0)) {
      throw new CustomError('duration (if provided) must be a positive number', 400);
    }

    const updatedPlanProgress = await planProgressService.updatePlanProgress(id, planProgressData);
    res.json(updatedPlanProgress);
  };

  deletePlanProgress = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid plan progress ID format', 400);
    }

    const userId = req.userId;
    if (!userId) {
      throw new CustomError('Unauthorized: User ID missing from Gateway', 401);
    }

    // Проверка, что пользователь удаляет свой прогресс плана
    const existingProgress = await planProgressService.getPlanProgressById(id);
    if (existingProgress.user_id !== userId) {
        throw new CustomError('Forbidden: You can only delete your own plan progress entries', 403);
    }

    await planProgressService.deletePlanProgress(id);
    res.status(204).send();
  };
}