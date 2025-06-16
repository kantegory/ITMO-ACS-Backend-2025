import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { hashPassword, comparePassword } from '../utils/password.util';
import { generateJwtToken } from '../utils/jwt.util';
import { CustomError } from "../utils/custom-error.util";
import { User } from "../models/User";

const userService = new UserService();

export class UserController {

  register = async (request: Request, response: Response) => {
    const { firstName, lastName, email, password, gender, birth_date } = request.body;

    if (!firstName || !email || !password) {
        throw new CustomError('Missing required fields for registration: firstName, email, password', 400);
    }

    const passwordHash = await hashPassword(password);

    const newUser = await userService.createUser({
      firstName,
      lastName,
      email,
      passwordHash,
      gender,
      birth_date,
    });
    // Удаляем passwordHash из ответа для безопасности
    const { passwordHash: _, ...userWithoutPassword } = newUser;
    return response.status(201).json(userWithoutPassword);
  };

  login = async (request: Request, response: Response) => {
    const { email, password } = request.body;

    if (!email || !password) {
        throw new CustomError('Email and password are required for login', 400);
    }

    let user: User;
    try {
        user = await userService.getUserByEmail(email);
    } catch (error) {
        // Ловим CustomError от сервиса, если user не найден по email,
        // и преобразуем в generic "Invalid credentials" для безопасности
        if (error instanceof CustomError && error.statusCode === 404) {
            throw new CustomError("Invalid email or password", 401);
        }
        throw error;
    }

    if (!(await comparePassword(password, user.passwordHash))) {
      throw new CustomError("Invalid email or password", 401);
    }

    const token = generateJwtToken(user.user_id);

    return response.json({ token });
  };

  getAllUsers = async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    // Удаляем passwordHash из каждого пользователя в ответе
    const usersWithoutPasswords = users.map(user => {
        const { passwordHash: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    });
    res.json(usersWithoutPasswords);
  };

  getUserById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid user ID format', 400);
    }
    const user = await userService.getUserById(id);
    const { passwordHash: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  };

  getUserByEmail = async (req: Request, res: Response) => {
    const email = req.params.email;
    if (!email) {
        throw new CustomError('Email is required for searching', 400);
    }
    const user = await userService.getUserByEmail(email);
    const { passwordHash: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  };

  updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid user ID format', 400);
    }

    const { firstName, lastName, email, password, gender, birth_date } = req.body;

    const userDataToUpdate: Partial<User> = {
      firstName,
      lastName,
      email,
      gender,
      birth_date
    };

    if (password) {
      userDataToUpdate.passwordHash = await hashPassword(password);
    }

    const updatedUser = await userService.updateUser(id, userDataToUpdate);
    const { passwordHash: _, ...userWithoutPassword } = updatedUser;
    res.json(userWithoutPassword);
  };

  deleteUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid user ID format', 400);
    }
    await userService.deleteUser(id);
    res.status(204).send();
  };

  getUserIdInternal = async (req: Request, res: Response) => {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        throw new CustomError('Invalid user ID format', 400);
      }
      const user = await userService.getUserById(id);
      res.status(200).json({ exists: true, user_id: user.user_id });
  }
}