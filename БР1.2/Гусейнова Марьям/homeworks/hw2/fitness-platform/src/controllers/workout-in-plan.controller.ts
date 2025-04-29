import { Request, Response } from 'express';
import { WorkoutInPlanService } from '../services/workout-in-plan.service';

const workoutInPlanService = new WorkoutInPlanService();

export class WorkoutInPlanController {
  async getAllWorkoutInPlans(req: Request, res: Response): Promise<void> {
    try {
      const workoutInPlans = await workoutInPlanService.getAllWorkoutInPlans();
      res.json(workoutInPlans);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch workout in plans' });
    }
  }

  async getWorkoutInPlanById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
      const workoutInPlan = await workoutInPlanService.getWorkoutInPlanById(id);
      if (workoutInPlan) {
        res.json(workoutInPlan);
      } else {
        res.status(404).json({ message: 'Workout in plan not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch workout in plan' });
    }
  }

  async createWorkoutInPlan(req: Request, res: Response): Promise<void> {
    try {
      const newWorkoutInPlan = await workoutInPlanService.createWorkoutInPlan(req.body);
      res.status(201).json(newWorkoutInPlan);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create workout in plan' });
    }
  }

  async updateWorkoutInPlan(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
      const updatedWorkoutInPlan = await workoutInPlanService.updateWorkoutInPlan(id, req.body);
      if (updatedWorkoutInPlan) {
        res.json(updatedWorkoutInPlan);
      } else {
        res.status(404).json({ message: 'Workout in plan not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update workout in plan' });
    }
  }

  async deleteWorkoutInPlan(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
      const success = await workoutInPlanService.deleteWorkoutInPlan(id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Workout in plan not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete workout in plan' });
    }
  }
}