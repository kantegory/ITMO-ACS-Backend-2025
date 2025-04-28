import { Request, Response } from "express";
import { userWorkoutProgressRepository } from "../repositories/userWorkoutProgress.repository";

export const UserWorkoutProgressController = {
  create: async (req: Request, res: Response) => {
    const progress = await userWorkoutProgressRepository.save(req.body);
    res.json(progress);
  },

  getAll: async (_: Request, res: Response) => {
    const progresses = await userWorkoutProgressRepository.find();
    res.json(progresses);
  },

  getById: async (req: Request, res: Response) => {
    const progress = await userWorkoutProgressRepository.findOneBy({ progress_id: +req.params.id });
    if (!progress) return res.status(404).json({ message: "Progress not found" });
    res.json(progress);
  },

  update: async (req: Request, res: Response) => {
    await userWorkoutProgressRepository.update(req.params.id, req.body);
    res.json({ message: "Progress updated" });
  },

  delete: async (req: Request, res: Response) => {
    await userWorkoutProgressRepository.delete(req.params.id);
    res.json({ message: "Progress deleted" });
  }
};
