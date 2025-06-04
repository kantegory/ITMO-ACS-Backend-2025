import { Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { Coach } from "../entities/Coach";
import { User } from "../entities/User";

const coachRepo = AppDataSource.getRepository(Coach);
const userRepo = AppDataSource.getRepository(User);

export class CoachController {
  // GET /coaches
  static async getAll(req: Request, res: Response) {
    try {
      const coaches = await coachRepo.find({
        relations: ["user", "athletes"],
      });
      return res.json(coaches);
    } catch {
      return res.status(500).json({ error: "Не удалось получить тренеров." });
    }
  }

  // GET /coaches/:id
  static async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });

    try {
      const coach = await coachRepo.findOne({
        where: { id },
        relations: ["user", "athletes"],
      });
      if (!coach) return res.status(404).json({ error: "Тренер не найден." });
      return res.json(coach);
    } catch {
      return res.status(500).json({ error: "Ошибка при поиске тренера." });
    }
  }

  // POST /coaches  (тело: { userId: number })
  static async create(req: Request, res: Response) {
    const { userId } = req.body;
    if (typeof userId !== "number") {
      return res.status(400).json({ error: "userId обязателен и должен быть числом." });
    }

    try {
      const user = await userRepo.findOneBy({ id: userId });
      if (!user) return res.status(404).json({ error: "Пользователь не найден." });

      const existing = await coachRepo.findOne({ where: { user: { id: userId } } });
      if (existing) return res.status(409).json({ error: "Coach для этого пользователя уже существует." });

      const newCoach = coachRepo.create({ user });
      await coachRepo.save(newCoach);
      return res.status(201).json(newCoach);
    } catch {
      return res.status(500).json({ error: "Не удалось создать тренера." });
    }
  }

  // PUT /coaches/:id (тело: { userId?: number })
  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const { userId } = req.body;
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });

    try {
      const coach = await coachRepo.findOne({ where: { id }, relations: ["user"] });
      if (!coach) return res.status(404).json({ error: "Тренер не найден." });

      if (userId) {
        const user = await userRepo.findOneBy({ id: userId });
        if (!user) return res.status(404).json({ error: "Новый пользователь не найден." });
        coach.user = user;
      }

      await coachRepo.save(coach);
      return res.json(coach);
    } catch {
      return res.status(500).json({ error: "Не удалось обновить тренера." });
    }
  }

  // DELETE /coaches/:id
  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });

    try {
      const result = await coachRepo.delete(id);
      if (result.affected === 0) return res.status(404).json({ error: "Тренер не найден." });
      return res.json({ message: "Тренер успешно удалён." });
    } catch {
      return res.status(500).json({ error: "Ошибка при удалении тренера." });
    }
  }
}
