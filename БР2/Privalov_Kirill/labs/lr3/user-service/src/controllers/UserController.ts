import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';
import { verifyJwt } from '../utils/jwt';
import { BaseController } from './BaseController';
import { User } from '../entities/User';


export class UserController extends BaseController<User> {
  constructor() {
    super(UserService.repo);
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(parseInt(id));
      res.status(200).json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      if (!req.body) {
        res.status(400).json({ error: 'No data provided' });
        return;
      }

      const user = await UserService.register(req.body);
      for (const key in user) {
        if (key === 'password') {
          delete user[key];
        }
      }

      res.status(201).json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const { user, token } = await UserService.login(email, password);
      const finalUser = {
        id: user.id,
        name: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      };
      res.status(200).json({ finalUser, token });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  changePassword = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { password } = req.body;

      const authHeader = req.get('Authorization');
      if (!authHeader) {
        res.status(401).json({ error: 'No Authorization header' });
        return;
      }
      const [scheme, token] = authHeader.split(' ');
      if (scheme !== 'Bearer' || !token) {
        res.status(401).json({ error: 'Malformed Authorization header' });
      }

      const payload = verifyJwt(token);
      if (!payload || payload.userId !== parseInt(id)) {
        res
          .status(403)
          .json({ error: 'Forbidden: You can only change your own password' });
      }

      const user = await UserService.changePassword(parseInt(id), password);
      res.status(200).json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
