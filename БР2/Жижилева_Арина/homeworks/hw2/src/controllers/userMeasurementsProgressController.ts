import UserMeasurementsProgress from '../models/UserMeasurementsProgress';
import { Request, Response } from 'express';

export const createMeasurement = async (req: Request, res: Response) => {
  const measure = new UserMeasurementsProgress(req.body);
  const saved = await measure.save();
  res.status(201).json(saved);
};

export const getMeasurement = async (req: Request, res: Response) => {
  const measure = await UserMeasurementsProgress.findById(req.params.id);
  if (!measure) return res.status(404).json({ error: 'Measurement not found' });
  res.json(measure);
};

export const updateMeasurement = async (req: Request, res: Response) => {
  const updated = await UserMeasurementsProgress.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteMeasurement = async (req: Request, res: Response) => {
  await UserMeasurementsProgress.findByIdAndDelete(req.params.id);
  res.status(204).end();
};

export const listMeasurements = async (_: Request, res: Response) => {
  const measurements = await UserMeasurementsProgress.find();
  res.json(measurements);
};
