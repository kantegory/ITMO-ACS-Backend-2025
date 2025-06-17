import { Request, Response } from 'express';
import { AppDataSource } from '../config/app-data-source';
import { WorkoutCategory } from '../entities/WorkoutCategory';

const workoutCategoryRepository = AppDataSource.getRepository(WorkoutCategory);

export const getWorkoutCategories = async (req: Request, res: Response) => {
  const workoutCategories = await workoutCategoryRepository.find();
  res.json(workoutCategories);
};

export const getWorkoutCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const workoutCategory = await workoutCategoryRepository.findOneBy({ id: Number(id) });

  if (!workoutCategory) {
    return res.status(404).json({ message: 'Workout category not found' });
  }

  res.json(workoutCategory);
};

export const createWorkoutCategory = async (req: Request, res: Response) => {
  const newWorkoutCategory = workoutCategoryRepository.create(req.body);
  const result = await workoutCategoryRepository.save(newWorkoutCategory);
  res.status(201).json(result);
};

export const updateWorkoutCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  await workoutCategoryRepository.update(id, req.body);
  res.json({ message: 'Workout category updated' });
};

export const deleteWorkoutCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  await workoutCategoryRepository.delete(id);
  res.json({ message: 'Workout category deleted' });
};