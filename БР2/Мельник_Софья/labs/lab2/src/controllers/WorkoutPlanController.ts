import { Request, Response } from 'express';
import { AppDataSource } from '../config/app-data-source';
import { WorkoutPlan } from '../entities/WorkoutPlan';

const workoutPlanRepository = AppDataSource.getRepository(WorkoutPlan);

export const getWorkoutPlans = async (req: Request, res: Response) => {
  const workoutPlans = await workoutPlanRepository.find();
  res.json(workoutPlans);
};

export const getWorkoutPlanById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const workoutPlan = await workoutPlanRepository.findOneBy({ id: Number(id) });

  if (!workoutPlan) {
    return res.status(404).json({ message: 'Workout plan not found' });
  }

  res.json(workoutPlan);
};

export const createWorkoutPlan = async (req: Request, res: Response) => {
  const newWorkoutPlan = workoutPlanRepository.create(req.body);
  const result = await workoutPlanRepository.save(newWorkoutPlan);
  res.status(201).json(result);
};

export const updateWorkoutPlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  await workoutPlanRepository.update(id, req.body);
  res.json({ message: 'Workout plan updated' });
};

export const deleteWorkoutPlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  await workoutPlanRepository.delete(id);
  res.json({ message: 'Workout plan deleted' });
};