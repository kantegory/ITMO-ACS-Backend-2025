import { Request, Response } from 'express';
import { WorkoutService } from '../services/workout.service';
import { WorkoutType } from '../enums/WorkoutType';
import { Level } from '../enums/Level';

const workoutService = new WorkoutService();

export class WorkoutController {

  searchWorkout = async (req: Request, res: Response) => {
    try {
      const { level, type, durationMin, durationMax } = req.query;

      const filters: {
        level?: Level;
        type?: WorkoutType;
        durationMin?: number;
        durationMax?: number;
      } = {};

      if (level && Object.values(Level).includes(level as Level)) {
        filters.level = level as Level;
      }
      if (type && Object.values(WorkoutType).includes(type as WorkoutType)) {
        filters.type = type as WorkoutType;
      }
      if (durationMin) {
        filters.durationMin = parseInt(durationMin as string, 10);
      }
      if (durationMax) {
        filters.durationMax = parseInt(durationMax as string, 10);
      }

      const plans = await workoutService.searchWorkouts(filters);
      res.json(plans);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to search workout plans' });
    }
  };

  getAllWorkouts = async (req: Request, res: Response) => {
    try {
      const workouts = await workoutService.getAllWorkouts();
      res.json(workouts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch workouts' });
    }
  };

  getWorkoutById = async (req: Request, res: Response) => {
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
  };

  createWorkout = async (req: Request, res: Response) => {
    try {
      const newWorkout = await workoutService.createWorkout(req.body);
      res.status(201).json(newWorkout);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create workout' });
    }
  };

  updateWorkout = async (req: Request, res: Response) => {
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
  };

  deleteWorkout = async (req: Request, res: Response) => {
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
  };
}