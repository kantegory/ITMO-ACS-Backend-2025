import { Request, Response } from "express";
import { userRepository } from "../repositories/user.repository";

export const UserController = {
  create: async (req: Request, res: Response) => {
    const user = await userRepository.save(req.body);
    res.json(user);
  },

  getAll: async (_: Request, res: Response) => {
    const users = await userRepository.find();
    res.json(users);
  },

  getById: async (req: Request, res: Response) => {
    const user = await userRepository.findOneBy({ user_id: +req.params.id });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  },

  getByEmail: async (req: Request, res: Response) => {
    const user = await userRepository.findOneBy({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  },

  update: async (req: Request, res: Response) => {
    await userRepository.update(req.params.id, req.body);
    res.json({ message: "User updated" });
  },

  delete: async (req: Request, res: Response) => {
    await userRepository.delete(req.params.id);
    res.json({ message: "User deleted" });
  }
};
