import Workout from '../models/Workout';
import { Request, Response } from 'express';

export const createWorkout = async (req: Request, res: Response) => {
  const workout = new Workout(req.body);
  const saved = await workout.save();
  res.status(201).json(saved);
};

export const getWorkout = async (req: Request, res: Response) => {
  const workout = await Workout.findById(req.params.id);
  if (!workout) return res.status(404).json({ error: 'Workout not found' });
  res.json(workout);
};

export const updateWorkout = async (req: Request, res: Response) => {
  const updated = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteWorkout = async (req: Request, res: Response) => {
  await Workout.findByIdAndDelete(req.params.id);
  res.status(204).end();
};

export const listWorkouts = async (_: Request, res: Response) => {
  const workouts = await Workout.find();
  res.json(workouts);
};
