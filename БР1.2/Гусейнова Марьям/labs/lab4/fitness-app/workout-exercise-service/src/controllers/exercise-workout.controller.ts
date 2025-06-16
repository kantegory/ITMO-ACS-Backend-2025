import { Request, Response } from 'express';
import { ExerciseWorkoutService } from '../services/exercise-workout.service';
import { CustomError } from '../utils/custom-error.util';

const exerciseWorkoutService = new ExerciseWorkoutService();

export class ExerciseWorkoutController {

  getAllExerciseWorkouts = async (req: Request, res: Response) => {
    const exerciseWorkouts = await exerciseWorkoutService.getAllExerciseWorkouts();
    res.json(exerciseWorkouts);
  };

  getExerciseWorkoutById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid exercise workout ID format', 400);
    }
    const exerciseWorkout = await exerciseWorkoutService.getExerciseWorkoutById(id);
    res.json(exerciseWorkout);
  };

  createExerciseWorkout = async (req: Request, res: Response) => {
    if (isNaN(req.body.exercise_id) || isNaN(req.body.workout_id)) {
        throw new CustomError('Exercise ID and Workout ID must be valid numbers', 400);
    }
    const newExerciseWorkout = await exerciseWorkoutService.createExerciseWorkout(req.body);
    res.status(201).json(newExerciseWorkout);
  };

  updateExerciseWorkout = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid exercise workout ID format', 400);
    }
    const updatedExerciseWorkout = await exerciseWorkoutService.updateExerciseWorkout(id, req.body);
    res.json(updatedExerciseWorkout);
  };

  deleteExerciseWorkout = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid exercise workout ID format', 400);
    }
    await exerciseWorkoutService.deleteExerciseWorkout(id);
    res.status(204).send();
  };
}