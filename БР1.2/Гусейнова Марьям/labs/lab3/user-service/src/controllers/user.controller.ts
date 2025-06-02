import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const userService = new UserService();

export class UserController {

  register = async (request: Request, response: Response) => {
    const { firstName, lastName, email, password, gender, birth_date } = request.body;

    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return response.status(400).json({ message: "Email already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    try {
      const newUser = await userService.createUser({
        firstName,
        lastName,
        email,
        passwordHash,
        gender,
        birth_date,
      });
      return response.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Failed to register user", error });
    }
  };

  login = async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const user = await userService.getUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return response.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return response.json({ token });
  };

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  };

  getUserById = async (req: Request, res: Response) => {
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
  };

  getUserByEmail = async (req: Request, res: Response) => {
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
  };

  updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { firstName, lastName, email, password, gender, birth_date } = req.body;

    const userDataToUpdate: Partial<User> = {
      firstName,
      lastName,
      email,
      gender,
      birth_date
    };

    if (password) {
      userDataToUpdate.passwordHash = await bcrypt.hash(password, 10);
    }

    try {
      const updatedUser = await userService.updateUser(id, userDataToUpdate);
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update user' });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
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
  };
}