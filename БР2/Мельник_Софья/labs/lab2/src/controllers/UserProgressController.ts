import { Request, Response } from 'express';
import { AppDataSource } from '../config/app-data-source';
import { UserProgress } from '../entities/UserProgress';

const userProgressRepository = AppDataSource.getRepository(UserProgress);

export const getUserProgresses = async (req: Request, res: Response) => {
  const progresses = await userProgressRepository.find();
  res.json(progresses);
};

export const getUserProgressById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const progress = await userProgressRepository.findOneBy({ id: Number(id) });

  if (!progress) {
    return res.status(404).json({ message: 'User progress not found' });
  }

  res.json(progress);
};

export const createUserProgress = async (req: Request, res: Response) => {
  const newProgress = userProgressRepository.create(req.body);
  const result = await userProgressRepository.save(newProgress);
  res.status(201).json(result);
};

export const updateUserProgress = async (req: Request, res: Response) => {
  const { id } = req.params;
  await userProgressRepository.update(id, req.body);
  res.json({ message: 'User progress updated' });
};

export const deleteUserProgress = async (req: Request, res: Response) => {
  const { id } = req.params;
  await userProgressRepository.delete(id);
  res.json({ message: 'User progress deleted' });
};