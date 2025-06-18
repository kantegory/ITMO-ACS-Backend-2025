import { Request, Response } from "express";
import { workoutRepository } from "../repositories/workout.repository";

export const WorkoutController = {
  create: async (req: Request, res: Response) => {
    const workout = await workoutRepository.save(req.body);
    res.json(workout);
  },

  getAll: async (_: Request, res: Response) => {
    const workouts = await workoutRepository.find();
    res.json(workouts);
  },

  getById: async (req: Request, res: Response) => {
    const workout = await workoutRepository.findOneBy({ workout_id: +req.params.id });
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.json(workout);
  },

  update: async (req: Request, res: Response) => {
    await workoutRepository.update(req.params.id, req.body);
    res.json({ message: "Workout updated" });
  },

  delete: async (req: Request, res: Response) => {
    await workoutRepository.delete(req.params.id);
    res.json({ message: "Workout deleted" });
  }
};
