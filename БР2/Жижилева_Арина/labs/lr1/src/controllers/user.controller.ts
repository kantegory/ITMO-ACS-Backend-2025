import { Request, Response } from "express";
import { userRepository } from "../repositories/user.repository";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";

export const UserController = {
  create: async (req: Request, res: Response) => {
    const user = await userRepository.save(req.body);
    res.json(user);
  },

  getAll: async (_: Request, res: Response) => {
    const users = await userRepository.find();
    res.json(users);
  },


  update: async (req: Request, res: Response) => {
    await userRepository.update(req.params.id, req.body);
    res.json({ message: "User updated" });
  },

  delete: async (req: Request, res: Response) => {
    await userRepository.delete(req.params.id);
    res.json({ message: "User deleted" });
  },
};
export const getUserByIdOrEmail = async (req: Request, res: Response) => {
  try {
    const { id, email } = req.query;

    if (!id && !email) {
      return res.status(400).json({ message: "Укажи id или email пользователя" });
    }

    const user = id
      ? await userRepository.findOne({ where: { user_id: Number(id) } })
      : await userRepository.findOne({ where: { email: String(email) } });

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.json(user);
  } catch (error) {
    console.error("Ошибка при поиске пользователя:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};