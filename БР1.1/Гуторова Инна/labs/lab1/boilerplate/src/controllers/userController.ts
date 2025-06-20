import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import User from "../entities/User";

export class UserController {
  static getProfile = async (req: Request, res: Response) => {
    const userId = (req as any).userId;

    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      email: user.email
    });
  };

  static getAllUsers = async (_req: Request, res: Response) => {
    const userRepo = AppDataSource.getRepository(User);
    const users = await userRepo.find();

    res.json(users.map(user => ({
      id: user.id,
      email: user.email
    })));
  };
}
