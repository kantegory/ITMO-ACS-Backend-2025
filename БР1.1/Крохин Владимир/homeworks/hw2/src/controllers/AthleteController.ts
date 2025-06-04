import { Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { Athlete } from "../entities/Athlete";
import { User } from "../entities/User";
import { Coach } from "../entities/Coach";

const athleteRepo = AppDataSource.getRepository(Athlete);
const userRepo = AppDataSource.getRepository(User);
const coachRepo = AppDataSource.getRepository(Coach);

export class AthleteController {
  // GET /athletes
  static async getAll(req: Request, res: Response) {
    try {
      const athletes = await athleteRepo.find({
        relations: ["user", "coaches", "trainings"],
      });
      return res.json(athletes);
    } catch {
      return res.status(500).json({ error: "Не удалось получить спортсменов." });
    }
  }

  // GET /athletes/:id
  static async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });

    try {
      const ath = await athleteRepo.findOne({
        where: { id },
        relations: ["user", "coaches", "trainings"],
      });
      if (!ath) return res.status(404).json({ error: "Спортсмен не найден." });
      return res.json(ath);
    } catch {
      return res.status(500).json({ error: "Ошибка при поиске спортсмена." });
    }
  }

  // POST /athletes (тело: { userId: number, coachIds?: number[] })
  static async create(req: Request, res: Response) {
    const { userId, coachIds } = req.body;
    if (typeof userId !== "number") {
      return res.status(400).json({ error: "userId обязателен и должен быть числом." });
    }

    try {
      const user = await userRepo.findOneBy({ id: userId });
      if (!user) return res.status(404).json({ error: "Пользователь не найден." });

      const existing = await athleteRepo.findOne({ where: { user: { id: userId } } });
      if (existing) return res.status(409).json({ error: "Athlete для этого пользователя уже существует." });

      const newAthlete = athleteRepo.create({ user, coaches: [] });

      if (Array.isArray(coachIds)) {
        const coaches = await coachRepo.findByIds(coachIds);
        newAthlete.coaches = coaches;
      }

      await athleteRepo.save(newAthlete);
      return res.status(201).json(newAthlete);
    } catch {
      return res.status(500).json({ error: "Не удалось создать спортсмена." });
    }
  }

  // PUT /athletes/:id (тело: { userId?: number, coachIds?: number[] })
  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const { userId, coachIds } = req.body;
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });

    try {
      const ath = await athleteRepo.findOne({
        where: { id },
        relations: ["user", "coaches"],
      });
      if (!ath) return res.status(404).json({ error: "Спортсмен не найден." });

      if (userId) {
        const user = await userRepo.findOneBy({ id: userId });
        if (!user) return res.status(404).json({ error: "Новый пользователь не найден." });
        ath.user = user;
      }
      if (Array.isArray(coachIds)) {
        const coaches = await coachRepo.findByIds(coachIds);
        ath.coaches = coaches;
      }

      await athleteRepo.save(ath);
      return res.json(ath);
    } catch {
      return res.status(500).json({ error: "Не удалось обновить спортсмена." });
    }
  }

  // DELETE /athletes/:id
  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });

    try {
      const result = await athleteRepo.delete(id);
      if (result.affected === 0) return res.status(404).json({ error: "Спортсмен не найден." });
      return res.json({ message: "Спортсмен успешно удалён." });
    } catch {
      return res.status(500).json({ error: "Ошибка при удалении спортсмена." });
    }
  }
}
