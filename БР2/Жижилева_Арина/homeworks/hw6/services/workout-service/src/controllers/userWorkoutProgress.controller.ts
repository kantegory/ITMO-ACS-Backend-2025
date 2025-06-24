import { Request, Response } from "express";
import { userWorkoutProgressRepository } from "../repositories/userWorkoutProgress.repository";
import axios from "axios";

const verifyToken = async (token: string) => {
  try {
    const response = await axios.get(`${process.env.USER_SERVICE_URL}/auth/verify-token`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const UserWorkoutProgressController = {
  create: async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });
    try {
      await verifyToken(token);
      const progress = await userWorkoutProgressRepository.save(req.body);
      res.json(progress);
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
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
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });
    try {
      await verifyToken(token);
      await userWorkoutProgressRepository.update(req.params.id, req.body);
      res.json({ message: "Progress updated" });
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  },
  delete: async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });
    try {
      await verifyToken(token);
      await userWorkoutProgressRepository.delete(req.params.id);
      res.json({ message: "Progress deleted" });
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  },
};