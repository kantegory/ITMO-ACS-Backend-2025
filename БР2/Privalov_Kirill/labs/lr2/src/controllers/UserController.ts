import { Request, Response } from 'express';
import { AppDataSource } from '../config/databaseConfig';
import { User } from '../entities/User';
import { BaseController } from './BaseController';
import { UserService } from '../services/UserService';
import { verifyJwt } from '../utils/jwt';

class UserControllerClass extends BaseController<User> {
  constructor() {
    super(AppDataSource.getRepository(User));
  }

  register = async (req: Request, res: Response) => {
    try {
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
  };
}

export const UserController = new UserControllerClass();
