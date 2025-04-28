import UserWorkoutProgress from '../models/UserWorkoutProgress';
import { Request, Response } from 'express';

export const createProgress = async (req: Request, res: Response) => {
  const progress = new UserWorkoutProgress(req.body);
  const saved = await progress.save();
  res.status(201).json(saved);
};

export const getProgress = async (req: Request, res: Response) => {
  const progress = await UserWorkoutProgress.findById(req.params.id);
  if (!progress) return res.status(404).json({ error: 'Progress not found' });
  res.json(progress);
};

export const updateProgress = async (req: Request, res: Response) => {
  const updated = await UserWorkoutProgress.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteProgress = async (req: Request, res: Response) => {
  await UserWorkoutProgress.findByIdAndDelete(req.params.id);
  res.status(204).end();
};

export const listProgress = async (_: Request, res: Response) => {
  const progress = await UserWorkoutProgress.find();
  res.json(progress);
};
