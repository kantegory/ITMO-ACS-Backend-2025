import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import User from "../entities/User";

export const authorizeAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ id: userId });

    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
