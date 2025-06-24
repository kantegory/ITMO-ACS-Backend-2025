import { Request, Response } from "express";
import { userMeasurementsProgressRepository } from "../repositories/userMeasurementsProgress.repository";

export const UserMeasurementsProgressController = {
  create: async (req: Request, res: Response) => {
    const progress = await userMeasurementsProgressRepository.save(req.body);
    res.json(progress);
  },

  getAll: async (_: Request, res: Response) => {
    const progresses = await userMeasurementsProgressRepository.find();
    res.json(progresses);
  },

  getById: async (req: Request, res: Response) => {
    const progress = await userMeasurementsProgressRepository.findOneBy({ measurments_id: +req.params.id });
    if (!progress) return res.status(404).json({ message: "Progress not found" });
    res.json(progress);
  },

  update: async (req: Request, res: Response) => {
    await userMeasurementsProgressRepository.update(req.params.id, req.body);
    res.json({ message: "Progress updated" });
  },

  delete: async (req: Request, res: Response) => {
    await userMeasurementsProgressRepository.delete(req.params.id);
    res.json({ message: "Progress deleted" });
  }
};
