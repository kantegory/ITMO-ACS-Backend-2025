import { Request, Response } from "express";
import AppDataSource from "../app-data-source";
import { User } from "../entities/User";
import hashPassword from "../utils/hash-password";
import jwt from 'jsonwebtoken';
import checkPassword from '../utils/check-password';

export const userController = {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await AppDataSource.getRepository(User).find();
    res.json(users);
  },

  async getUserById(req: Request, res: Response): Promise<void> {
    const user = await AppDataSource.getRepository(User).findOneBy({
      user_id: Number(req.params.id),
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  },

  async getUserByEmail(req: Request, res: Response): Promise<void> {
    const user = await AppDataSource.getRepository(User).findOneBy({
      email: req.params.email,
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  },

  async createUser(req: Request, res: Response): Promise<void> {
    const data = req.body;

    if (data.user_id && isNaN(Number(data.user_id))) {
      res.status(400).json({ message: "Invalid user_id" });
      return;
    }

    if (!data.password) {
      res.status(400).json({ message: "Password is required" });
      return;
    }

    data.password = hashPassword(data.password);

    const repo = AppDataSource.getRepository(User);
    const newUser = repo.create(data);
    const result = await repo.save(newUser);
    res.status(201).json(result);
    },

  async loginUser(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  const repo = AppDataSource.getRepository(User);
  const user = await repo.findOneBy({ email });

  if (!user || !checkPassword(user.password, password)) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const token = jwt.sign({ user: { id: user.user_id, email: user.email } }, process.env.JWT_SECRET_KEY!, {
    expiresIn: '1h'
  });

  res.json({ token });
  },

  async updateUser(req: Request, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOneBy({ user_id: Number(req.params.id) });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    repo.merge(user, req.body);
    const result = await repo.save(user);
    res.json(result);
  },

  async deleteUser(req: Request, res: Response): Promise<void> {
    const result = await AppDataSource.getRepository(User).delete({
      user_id: Number(req.params.id),
    });
    res.json(result);
  }
};
