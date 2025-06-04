import { Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";

// Репозиторий User
const userRepo = AppDataSource.getRepository(User);

export class UserController {
  // GET /users — список всех пользователей
  static async getAll(req: Request, res: Response) {
    try {
      const users = await userRepo.find({
        relations: ["coachProfiles", "athleteProfiles", "notes"],
      });
      return res.json(users);
    } catch (err) {
      return res.status(500).json({ error: "Не удалось получить список пользователей." });
    }
  }

  // GET /users/:id — получить пользователя по id
  static async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Некорректный ID." });

    try {
      const user = await userRepo.findOne({
        where: { id },
        relations: ["coachProfiles", "athleteProfiles", "notes"],
      });
      if (!user) return res.status(404).json({ error: "Пользователь не найден." });
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: "Ошибка при поиске пользователя." });
    }
  }

  // GET /users/email/:email — получить пользователя по email
  static async getByEmail(req: Request, res: Response) {
    const rawEmail = req.params.email;
    try {
      const user = await userRepo.findOne({
        where: { email: rawEmail },
        relations: ["coachProfiles", "athleteProfiles", "notes"],
      });
      if (!user) return res.status(404).json({ error: "Пользователь не найден." });
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: "Ошибка при поиске пользователя." });
    }
  }

  // POST /users — создать нового пользователя
  static async create(req: Request, res: Response) {
    const { username, email, password, firstName, secondName, avatar } = req.body;
    if (!username || !email || !password || !firstName || !secondName) {
      return res.status(400).json({ error: "Не все обязательные поля заполнены." });
    }

    try {
      // Проверим, нет ли такого email
      const existing = await userRepo.findOne({ where: { email } });
      if (existing) return res.status(409).json({ error: "Email уже занят." });

      // Хэшируем пароль
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      const newUser = userRepo.create({
        username,
        email,
        passwordHash: hashed,
        firstName,
        secondName,
        avatar: avatar ? Buffer.from(avatar, "base64") : null,
      });

      await userRepo.save(newUser);
      return res.status(201).json(newUser);
    } catch (err) {
      return res.status(500).json({ error: "Не удалось создать пользователя." });
    }
  }

  // PUT /users/:id — обновить существующего пользователя
  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Некорректный ID." });

    const { username, email, password, firstName, secondName, avatar } = req.body;

    try {
      const user = await userRepo.findOne({ where: { id } });
      if (!user) return res.status(404).json({ error: "Пользователь не найден." });

      if (email && email !== user.email) {
        // Проверим уникальность email
        const conflict = await userRepo.findOne({ where: { email } });
        if (conflict) return res.status(409).json({ error: "Email уже занят." });
        user.email = email;
      }
      if (username) user.username = username;
      if (firstName) user.firstName = firstName;
      if (secondName) user.secondName = secondName;
      if (avatar) user.avatar = Buffer.from(avatar, "base64");
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.passwordHash = await bcrypt.hash(password, salt);
      }

      await userRepo.save(user);
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: "Не удалось обновить пользователя." });
    }
  }

  // DELETE /users/:id — удалить пользователя
  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Некорректный ID." });

    try {
      const result = await userRepo.delete(id);
      if (result.affected === 0) return res.status(404).json({ error: "Пользователь не найден." });
      return res.json({ message: "Пользователь успешно удалён." });
    } catch (err) {
      return res.status(500).json({ error: "Ошибка при удалении пользователя." });
    }
  }
}
