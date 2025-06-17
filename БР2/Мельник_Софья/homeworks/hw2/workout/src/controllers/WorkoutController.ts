import { Request, Response } from 'express';
import { AppDataSource } from '../config/app-data-source';
import { Workout } from '../entities/Workout';

const workoutRepository = AppDataSource.getRepository(Workout);

export const getWorkouts = async (req: Request, res: Response) => {
  const workouts = await workoutRepository.find();
  res.json(workouts);
};

export const getWorkoutById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const workout = await workoutRepository.findOneBy({ id: Number(id) });

  if (!workout) {
    return res.status(404).json({ message: 'Workout not found' });
  }

  res.json(workout);
};

export const createWorkout = async (req: Request, res: Response) => {
  const newWorkout = workoutRepository.create(req.body);
  const result = await workoutRepository.save(newWorkout);
  res.status(201).json(result);
};

export const updateWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;
  await workoutRepository.update(id, req.body);
  res.json({ message: 'Workout updated' });
};

export const deleteWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;
  await workoutRepository.delete(id);
  res.json({ message: 'Workout deleted' });
};