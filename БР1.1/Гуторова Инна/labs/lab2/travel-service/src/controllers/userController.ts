import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import User from "../entities/User";
import { authenticate } from "../middleware/auth";

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
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            isAdmin: user.isAdmin
        });
    };

    static getAllUsers = async (req: Request, res: Response) => {
        const userRepo = AppDataSource.getRepository(User);
        const users = await userRepo.find();

        res.json(users.map(user => ({
            id: user.id,
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            isAdmin: user.isAdmin
        })));
    };


    static getUserById = async (req: Request, res: Response) => {
      try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
        user ? res.json(user) : res.status(404).json({ message: 'User not found' });
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    };

    static updateUser = [authenticate, async (req: Request, res: Response) => {
      try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!user) return res.status(404).json({ message: 'User not found' });
        userRepository.merge(user, req.body);
        const result = await userRepository.save(user);
        res.json(result);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    }];

    static deleteUser = [authenticate, async (req: Request, res: Response) => {
      try {
        const result = await AppDataSource.getRepository(User).delete(req.params.id);
        result.affected === 1
          ? res.json({ message: 'User deleted' })
          : res.status(404).json({ message: 'User not found' });
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    }];
}