import { Request, Response } from 'express';
import { WorkoutService } from '../services/workout.service';

const workoutService = new WorkoutService();

export class WorkoutController {
  async getAllWorkouts(req: Request, res: Response): Promise<void> {
    try {
      const workouts = await workoutService.getAllWorkouts();
      res.json(workouts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch workouts' });
    }
  }

  async getWorkoutById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
      const workout = await workoutService.getWorkoutById(id);
      if (workout) {
        res.json(workout);
      } else {
        res.status(404).json({ message: 'Workout not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch workout' });
    }
  }

  async createWorkout(req: Request, res: Response): Promise<void> {
    try {
      const newWorkout = await workoutService.createWorkout(req.body);
      res.status(201).json(newWorkout);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create workout' });
    }
  }

  async updateWorkout(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
      const updatedWorkout = await workoutService.updateWorkout(id, req.body);
      if (updatedWorkout) {
        res.json(updatedWorkout);
      } else {
        res.status(404).json({ message: 'Workout not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update workout' });
    }
  }

  async deleteWorkout(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
      const success = await workoutService.deleteWorkout(id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Workout not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete workout' });
    }
  }
}