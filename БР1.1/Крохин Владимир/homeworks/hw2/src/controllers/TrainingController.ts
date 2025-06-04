import { Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { Training } from "../entities/Training";
import { Athlete } from "../entities/Athlete";

const trRepo = AppDataSource.getRepository(Training);
const athRepo = AppDataSource.getRepository(Athlete);

export class TrainingController {
  static async getAll(_req: Request, res: Response) {
    try {
      const list = await trRepo.find({
        relations: ["athlete", "freeTrainingProfile", "qualificationTrainingProfile", "series", "trainingNotes"],
      });
      return res.json(list);
    } catch {
      return res.status(500).json({ error: "Не удалось получить Training." });
    }
  }

  static async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });
    try {
      const item = await trRepo.findOne({
        where: { id },
        relations: [
          "athlete",
          "freeTrainingProfile",
          "qualificationTrainingProfile",
          "series",
          "trainingNotes",
        ],
      });
      if (!item) return res.status(404).json({ error: "Не найдено." });
      return res.json(item);
    } catch {
      return res.status(500).json({ error: "Ошибка при поиске Training." });
    }
  }

  static async create(req: Request, res: Response) {
    /**
     * Ожидаем тело:
     * {
     *   athleteId: number,
     *   startTs: string (ISO),
     *   endTs?: string (ISO),
     *   totalScore?: number
     * }
     */
    const { athleteId, startTs, endTs, totalScore } = req.body;
    if (typeof athleteId !== "number" || !startTs) {
      return res.status(400).json({ error: "Отсутствуют обязательные поля." });
    }

    try {
      const athlete = await athRepo.findOneBy({ id: athleteId });
      if (!athlete) return res.status(404).json({ error: "Спортсмен не найден." });

      const newTr = trRepo.create({
        athlete,
        startTs: new Date(startTs),
        endTs: endTs ? new Date(endTs) : null,
        totalScore: typeof totalScore === "number" ? totalScore : 0,
      });

      await trRepo.save(newTr);
      return res.status(201).json(newTr);
    } catch {
      return res.status(500).json({ error: "Не удалось создать Training." });
    }
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const { athleteId, startTs, endTs, totalScore } = req.body;
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });

    try {
      const tr = await trRepo.findOne({ where: { id }, relations: ["athlete"] });
      if (!tr) return res.status(404).json({ error: "Не найдено." });

      if (typeof athleteId === "number") {
        const athlete = await athRepo.findOneBy({ id: athleteId });
        if (!athlete) return res.status(404).json({ error: "Спортсмен не найден." });
        tr.athlete = athlete;
      }
      if (startTs) tr.startTs = new Date(startTs);
      if (endTs) tr.endTs = new Date(endTs);
      if (typeof totalScore === "number") tr.totalScore = totalScore;

      await trRepo.save(tr);
      return res.json(tr);
    } catch {
      return res.status(500).json({ error: "Не удалось обновить Training." });
    }
  }

  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });
    try {
      const result = await trRepo.delete(id);
      if (result.affected === 0) return res.status(404).json({ error: "Не найдено." });
      return res.json({ message: "Удалено." });
    } catch {
      return res.status(500).json({ error: "Ошибка при удалении Training." });
    }
  }
}
