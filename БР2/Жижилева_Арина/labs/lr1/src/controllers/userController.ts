import User from '../models/User';
import { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response) => {
  const newUser = new User(req.body);
  const saved = await newUser.save();
  res.status(201).json(saved);
};

export const getUserByIdOrEmail = async (req: Request, res: Response) => {
  const { id, email } = req.query;
  const user = await User.findOne(id ? { _id: id } : { email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

