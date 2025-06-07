import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import User from '../entities/User';

export const createUser = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    

    const userData = {
      ...req.body,
      registration_date: new Date()
    };
    
    const newUser = userRepository.create(userData);
    await userRepository.save(newUser);
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ user_id: parseInt(req.params.id) });
    user ? res.json(user) : res.status(404).json({ message: 'User not found' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email: req.params.email });
    user ? res.json(user) : res.status(404).json({ message: 'User not found' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ user_id: parseInt(req.params.id) });
    if (!user) return res.status(404).json({ message: 'User not found' });
    userRepository.merge(user, req.body);
    const result = await userRepository.save(user);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await AppDataSource.getRepository(User).delete(req.params.id);
    result.affected === 1
      ? res.json({ message: 'User deleted' })
      : res.status(404).json({ message: 'User not found' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
