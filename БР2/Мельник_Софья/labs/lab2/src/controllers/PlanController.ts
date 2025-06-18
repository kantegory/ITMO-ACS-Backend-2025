import { Request, Response } from 'express';
import { AppDataSource } from '../config/app-data-source';
import { Plan } from '../entities/Plan';

const planRepository = AppDataSource.getRepository(Plan);

export const getPlans = async (req: Request, res: Response) => {
  const plans = await planRepository.find();
  res.json(plans);
};

export const getPlanById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const plan = await planRepository.findOneBy({ id: Number(id) });

  if (!plan) {
    return res.status(404).json({ message: 'Plan not found' });
  }

  res.json(plan);
};

export const createPlan = async (req: Request, res: Response) => {
  const newPlan = planRepository.create(req.body);
  const result = await planRepository.save(newPlan);
  res.status(201).json(result);
};

export const updatePlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  await planRepository.update(id, req.body);
  res.json({ message: 'Plan updated' });
};

export const deletePlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  await planRepository.delete(id);
  res.json({ message: 'Plan deleted' });
};
