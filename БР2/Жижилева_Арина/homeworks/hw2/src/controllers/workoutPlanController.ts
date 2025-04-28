import WorkoutPlan from '../models/WorkoutPlan';
import { Request, Response } from 'express';

export const createPlan = async (req: Request, res: Response) => {
  const plan = new WorkoutPlan(req.body);
  const saved = await plan.save();
  res.status(201).json(saved);
};

export const getPlan = async (req: Request, res: Response) => {
  const plan = await WorkoutPlan.findById(req.params.id);
  if (!plan) return res.status(404).json({ error: 'Plan not found' });
  res.json(plan);
};

export const updatePlan = async (req: Request, res: Response) => {
  const updated = await WorkoutPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deletePlan = async (req: Request, res: Response) => {
  await WorkoutPlan.findByIdAndDelete(req.params.id);
  res.status(204).end();
};

export const listPlans = async (_: Request, res: Response) => {
  const plans = await WorkoutPlan.find();
  res.json(plans);
};
