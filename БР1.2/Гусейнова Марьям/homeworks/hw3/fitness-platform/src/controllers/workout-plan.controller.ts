import { Request, Response } from 'express';
import { WorkoutPlanService } from '../services/workout-plan.service';

const workoutPlanService = new WorkoutPlanService();

export class WorkoutPlanController {

  getAllMyWorkoutPlans = async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      const plans = await workoutPlanService.getAllMyWorkoutPlans(userId);
      res.json(plans);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch user workout plans' });
    }
  };

  getAllWorkoutPlans = async (req: Request, res: Response) => {
    try {
      const workoutPlans = await workoutPlanService.getAllWorkoutPlans();
      res.json(workoutPlans);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch workout plans' });
    }
  };

  getWorkoutPlanById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const workoutPlan = await workoutPlanService.getWorkoutPlanById(id);
      if (workoutPlan) {
        res.json(workoutPlan);
      } else {
        res.status(404).json({ message: 'Workout plan not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch workout plan' });
    }
  };

  createWorkoutPlan = async (req: Request, res: Response) => {
    try {
      const newWorkoutPlan = await workoutPlanService.createWorkoutPlan(req.body);
      res.status(201).json(newWorkoutPlan);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create workout plan' });
    }
  };

  updateWorkoutPlan = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const updatedWorkoutPlan = await workoutPlanService.updateWorkoutPlan(id, req.body);
      if (updatedWorkoutPlan) {
        res.json(updatedWorkoutPlan);
      } else {
        res.status(404).json({ message: 'Workout plan not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update workout plan' });
    }
  };

  deleteWorkoutPlan = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const success = await workoutPlanService.deleteWorkoutPlan(id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Workout plan not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete workout plan' });
    }
  };
}