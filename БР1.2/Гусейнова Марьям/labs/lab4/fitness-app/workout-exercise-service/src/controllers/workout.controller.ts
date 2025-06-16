import { Request, Response } from 'express';
import { WorkoutService } from '../services/workout.service';
import { CustomError } from '../utils/custom-error.util';
import { WorkoutType } from '../enums/WorkoutType';
import { Level } from '../enums/Level';

const workoutService = new WorkoutService();

export class WorkoutController {

  searchWorkout = async (req: Request, res: Response) => {
      const { level, type, durationMin, durationMax } = req.query;

      const filters: {
        level?: Level;
        type?: WorkoutType;
        durationMin?: number;
        durationMax?: number;
      } = {};

      if (level) {
        filters.level = level as Level; 
      }
      if (type) {
        filters.type = type as WorkoutType;
      }
      if (durationMin) {
        const parsedDurationMin = parseInt(durationMin as string, 10);
        if (isNaN(parsedDurationMin)) {
            throw new CustomError('Invalid durationMin query parameter: must be a number', 400);
        }
        filters.durationMin = parsedDurationMin;
      }
      if (durationMax) {
        const parsedDurationMax = parseInt(durationMax as string, 10);
        if (isNaN(parsedDurationMax)) {
            throw new CustomError('Invalid durationMax query parameter: must be a number', 400);
        }
        filters.durationMax = parsedDurationMax;
      }

      const plans = await workoutService.searchWorkouts(filters);
      res.json(plans);
  };

  getAllWorkouts = async (req: Request, res: Response) => {
    const workouts = await workoutService.getAllWorkouts();
    res.json(workouts);
  };

  getWorkoutById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid workout ID format', 400);
    }
    const workout = await workoutService.getWorkoutById(id);
    res.json(workout);
  };

  createWorkout = async (req: Request, res: Response) => {
    const newWorkout = await workoutService.createWorkout(req.body);
    res.status(201).json(newWorkout);
  };

  updateWorkout = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid workout ID format', 400);
    }
    const updatedWorkout = await workoutService.updateWorkout(id, req.body);
    res.json(updatedWorkout);
  };

  deleteWorkout = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid workout ID format', 400);
    }
    await workoutService.deleteWorkout(id);
    res.status(204).send();
  };

  // Метод для внутренних запросов без аутентификации
  getWorkoutByIdInternal = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid workout ID format', 400);
    }
    try {
      const workout = await workoutService.getWorkoutById(id);
      res.status(200).json({ exists: true, workout: workout }); 
    } catch (error) {
      if (error instanceof CustomError && error.statusCode === 404) {
        res.status(404).json({ exists: false, message: 'Workout not found' });
      } else {
        throw error;
      }
    }
  };
}