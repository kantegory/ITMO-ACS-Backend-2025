import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

export class UserController {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
      const user = await userService.getUserById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch user' });
    }
  }

  async getUserByEmail(req: Request, res: Response): Promise<void> {
    const email = req.params.email;
    try {
      const user = await userService.getUserByEmail(email);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch user' });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const newUser = await userService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create user' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
      const updatedUser = await userService.updateUser(id, req.body);
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update user' });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
      const success = await userService.deleteUser(id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete user' });
    }
  }
}