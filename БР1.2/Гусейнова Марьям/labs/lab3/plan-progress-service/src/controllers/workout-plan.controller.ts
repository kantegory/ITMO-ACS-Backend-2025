import { Request, Response } from 'express';
import { WorkoutPlanService } from '../services/workout-plan.service';
import { CustomError } from '../utils/custom-error.util';

const workoutPlanService = new WorkoutPlanService();

export class WorkoutPlanController {

  getAllMyWorkoutPlans = async (req: Request, res: Response) => {
    const userId = req.userId; 
    const plans = await workoutPlanService.getAllMyWorkoutPlans(userId!);
    res.json(plans);
  };

  getAllWorkoutPlans = async (req: Request, res: Response) => {
    const workoutPlans = await workoutPlanService.getAllWorkoutPlans();
    res.json(workoutPlans);
  };

  getWorkoutPlanById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid workout plan ID format', 400);
    }
    const workoutPlan = await workoutPlanService.getWorkoutPlanById(id);
    res.json(workoutPlan);
  };

  createWorkoutPlan = async (req: Request, res: Response) => {
    const userId = req.userId;
    if (!userId) {
      throw new CustomError('Unauthorized: User ID missing from Gateway', 401);
    }
    // Передаем userId из токена, если он отсутствует в теле запроса,
    const workoutPlanData = { ...req.body, user_id: userId }; 
    
    const newWorkoutPlan = await workoutPlanService.createWorkoutPlan(workoutPlanData);
    res.status(201).json(newWorkoutPlan);
  };

  updateWorkoutPlan = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid workout plan ID format', 400);
    }

    const userId = req.userId;
    if (!userId) {
      throw new CustomError('Unauthorized: User ID missing from Gateway', 401);
    }

    // Проверка, что пользователь обновляет свой план
    const existingPlan = await workoutPlanService.getWorkoutPlanById(id);
    if (existingPlan.user_id !== userId) {
        throw new CustomError('Forbidden: You can only update your own workout plans', 403);
    }
    
    const workoutPlanData = { ...req.body, user_id: existingPlan.user_id }; // Принудительно сохраняем оригинальный user_id плана

    const updatedWorkoutPlan = await workoutPlanService.updateWorkoutPlan(id, workoutPlanData);
    res.json(updatedWorkoutPlan);
  };

  deleteWorkoutPlan = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid workout plan ID format', 400);
    }

    const userId = req.userId;
    if (!userId) {
      throw new CustomError('Unauthorized: User ID missing from Gateway', 401);
    }

    // Проверка, что пользователь удаляет свой план
    const existingPlan = await workoutPlanService.getWorkoutPlanById(id);
    if (existingPlan.user_id !== userId) {
        throw new CustomError('Forbidden: You can only delete your own workout plans', 403);
    }

    await workoutPlanService.deleteWorkoutPlan(id);
    res.status(204).send();
  };
}