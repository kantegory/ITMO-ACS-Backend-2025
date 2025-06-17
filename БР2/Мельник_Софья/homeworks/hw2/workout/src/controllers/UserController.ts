import { Request, Response } from 'express';
import { AppDataSource } from '../config/app-data-source';
import { User } from '../entities/User';

const userRepository = AppDataSource.getRepository(User);

export const getUsers = async (req: Request, res: Response) => {
  const users = await userRepository.find();
  res.json(users);
};

export const getUserByIdOrEmail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email } = req.query;

  let user;
  if (email) {
    user = await userRepository.findOneBy({ email: String(email) });
  } else {
    user = await userRepository.findOneBy({ id: Number(id) });
  }

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const newUser = userRepository.create(req.body);
  const result = await userRepository.save(newUser);
  res.status(201).json(result);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await userRepository.update(id, req.body);
  res.json({ message: 'User updated' });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await userRepository.delete(id);
  res.json({ message: 'User deleted' });
};