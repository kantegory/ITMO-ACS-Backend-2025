import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/database";
import { User } from "../entities/User";

export interface AuthRequest extends Request {
  user?: User;
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { UserID: decoded.userId } });

    if (!user) {
      return res.status(401).json({ message: "Invalid token." });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

export const optionalAuthMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any;
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { UserID: decoded.userId } });
      req.user = user || undefined;
    }

    next();
  } catch (error) {
    next();
  }
}; 