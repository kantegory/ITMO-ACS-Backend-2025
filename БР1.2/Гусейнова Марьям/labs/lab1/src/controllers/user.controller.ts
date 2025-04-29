import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../models/User";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

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

  async create(request: Request, response: Response) {
    const { firstName, lastName, email, password } = request.body;

    // Здесь должна быть логика хеширования пароля перед сохранением
    const passwordHash = password; // Временное значение

    const user = this.userRepository.create({
      firstName,
      lastName,
      email,
      passwordHash,
    });

    try {
      const results = await this.userRepository.save(user);
      return response.status(201).json(results);
    } catch (error) {
      return response.status(500).json({ message: "Failed to create user", error });
    }
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
    // Здесь также должна быть логика обновления пароля (хеширование)

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