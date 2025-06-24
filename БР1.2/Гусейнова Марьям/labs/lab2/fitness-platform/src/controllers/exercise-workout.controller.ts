import { Request, Response } from 'express';
import { ExerciseWorkoutService } from '../services/exercise-workout.service';

const exerciseWorkoutService = new ExerciseWorkoutService();

export class ExerciseWorkoutController {

  getAllExerciseWorkouts = async (req: Request, res: Response) => {
    try {
      const exerciseWorkouts = await exerciseWorkoutService.getAllExerciseWorkouts();
      res.json(exerciseWorkouts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch exercise workouts' });
    }
  };

  getExerciseWorkoutById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const exerciseWorkout = await exerciseWorkoutService.getExerciseWorkoutById(id);
      if (exerciseWorkout) {
        res.json(exerciseWorkout);
      } else {
        res.status(404).json({ message: 'Exercise workout not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch exercise workout' });
    }
  };

  createExerciseWorkout = async (req: Request, res: Response) => {
    try {
      const newExerciseWorkout = await exerciseWorkoutService.createExerciseWorkout(req.body);
      res.status(201).json(newExerciseWorkout);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create exercise workout' });
    }
  };

  updateExerciseWorkout = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const updatedExerciseWorkout = await exerciseWorkoutService.updateExerciseWorkout(id, req.body);
      if (updatedExerciseWorkout) {
        res.json(updatedExerciseWorkout);
      } else {
        res.status(404).json({ message: 'Exercise workout not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update exercise workout' });
    }
  };

  deleteExerciseWorkout = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const success = await exerciseWorkoutService.deleteExerciseWorkout(id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Exercise workout not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete exercise workout' });
    }
  };
}