import { Request, Response } from "express";
import { workoutPlanRepository } from "../repositories/workoutPlan.repository";

export const WorkoutPlanController = {
  create: async (req: Request, res: Response) => {
    const plan = await workoutPlanRepository.save(req.body);
    res.json(plan);
  },

  getAll: async (_: Request, res: Response) => {
    const plans = await workoutPlanRepository.find();
    res.json(plans);
  },

  getById: async (req: Request, res: Response) => {
    const plan = await workoutPlanRepository.findOneBy({ plan_id: +req.params.id });
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.json(plan);
  },

  update: async (req: Request, res: Response) => {
    await workoutPlanRepository.update(req.params.id, req.body);
    res.json({ message: "Plan updated" });
  },

  delete: async (req: Request, res: Response) => {
    await workoutPlanRepository.delete(req.params.id);
    res.json({ message: "Plan deleted" });
  }
};
