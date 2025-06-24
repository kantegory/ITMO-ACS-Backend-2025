import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async register(request: Request, response: Response) {
    const { firstName, lastName, email, password } = request.body;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      return response.status(400).json({ message: "Email already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      firstName,
      lastName,
      email,
      passwordHash,
    });

    try {
      const savedUser = await this.userRepository.save(user);
      return response.status(201).json(savedUser);
    } catch (error) {
      return response.status(500).json({ message: "Failed to register user", error });
    }
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return response.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return response.json({ token });
  }

  async getAll(request: Request, response: Response) {
    const users = await this.userRepository.find();
    response.json(users);
  }

  async getOne(request: Request, response: Response) {
    const id = parseInt(request.params.id);

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    return response.json(user);
  }

  async update(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const { firstName, lastName, email, password } = request.body;

    const userToUpdate = await this.userRepository.findOne({ where: { id } });

    if (!userToUpdate) {
      return response.status(404).json({ message: "User not found" });
    }

    userToUpdate.firstName = firstName;
    userToUpdate.lastName = lastName;
    userToUpdate.email = email;
    if (password) {
      userToUpdate.passwordHash = await bcrypt.hash(password, 10);
    }

    try {
      const results = await this.userRepository.save(userToUpdate);
      return response.json(results);
    } catch (error) {
      return response.status(500).json({ message: "Failed to update user", error });
    }
  }

  async delete(request: Request, response: Response) {
    const id = parseInt(request.params.id);

    try {
      const userToRemove = await this.userRepository.findOne({
        where: { id },
      });

      if (!userToRemove) {
        return response.status(404).json({ message: "User not found" });
      }

      await this.userRepository.remove(userToRemove);
      return response.status(204).send();
    } catch (error) {
      return response.status(500).json({ message: "Failed to delete user", error });
    }
  }
}