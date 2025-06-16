import { Request, Response } from 'express';
import { WorkoutInPlanService } from '../services/workout-in-plan.service';
import { CustomError } from '../utils/custom-error.util';

const workoutInPlanService = new WorkoutInPlanService();

export class WorkoutInPlanController {
  
  getAllWorkoutInPlans = async (req: Request, res: Response) => {
    const workoutInPlans = await workoutInPlanService.getAllWorkoutInPlans();
    res.json(workoutInPlans);
  };

  getWorkoutInPlanById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid workout in plan ID format', 400);
    }
    const workoutInPlan = await workoutInPlanService.getWorkoutInPlanById(id);
    res.json(workoutInPlan);
  };

  createWorkoutInPlan = async (req: Request, res: Response) => {
    const { plan_id, workout_id, ordinal_number } = req.body;
    if (isNaN(plan_id) || isNaN(workout_id) || isNaN(ordinal_number)) {
      throw new CustomError('plan_id, workout_id, and ordinal_number must be valid numbers', 400);
    }
    const newWorkoutInPlan = await workoutInPlanService.createWorkoutInPlan(req.body);
    res.status(201).json(newWorkoutInPlan);
  };

  updateWorkoutInPlan = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid workout in plan ID format', 400);
    }

    const { plan_id, workout_id, ordinal_number } = req.body;
    if ((plan_id !== undefined && isNaN(plan_id)) || 
        (workout_id !== undefined && isNaN(workout_id)) || 
        (ordinal_number !== undefined && isNaN(ordinal_number))) {
      throw new CustomError('plan_id, workout_id, and ordinal_number (if provided) must be valid numbers', 400);
    }

    const updatedWorkoutInPlan = await workoutInPlanService.updateWorkoutInPlan(id, req.body);
    res.json(updatedWorkoutInPlan);
  };

  deleteWorkoutInPlan = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid workout in plan ID format', 400);
    }
    await workoutInPlanService.deleteWorkoutInPlan(id);
    res.status(204).send();
  };
}