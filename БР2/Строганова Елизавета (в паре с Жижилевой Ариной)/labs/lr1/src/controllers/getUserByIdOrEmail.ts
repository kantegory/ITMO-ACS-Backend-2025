import { Request, Response } from "express";
import { userRepository } from "../repositories/user.repository";

export const getUserByIdOrEmail = async (req: Request, res: Response) => {
  try {
    const { id, email } = req.query;

    if (!id && !email) {
      return res.status(400).json({ message: "Укажи id или email" });
    }

    const user = id
      ? await userRepository.findOne({ where: { user_id: Number(id) } })
      : await userRepository.findOne({ where: { email: String(email) } });

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.json(user);
  } catch (error) {
    console.error("Ошибка поиска пользователя:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
