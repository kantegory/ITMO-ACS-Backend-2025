import { Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { Series } from "../entities/Series";
import { Training } from "../entities/Training";

const seriesRepo = AppDataSource.getRepository(Series);
const trRepo = AppDataSource.getRepository(Training);

export class SeriesController {
  static async getAll(_req: Request, res: Response) {
    try {
      const list = await seriesRepo.find({ relations: ["training", "shots", "seriesNotes"] });
      return res.json(list);
    } catch {
      return res.status(500).json({ error: "Не удалось получить Series." });
    }
  }

  static async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });
    try {
      const item = await seriesRepo.findOne({
        where: { id },
        relations: ["training", "shots", "seriesNotes"],
      });
      if (!item) return res.status(404).json({ error: "Не найдено." });
      return res.json(item);
    } catch {
      return res.status(500).json({ error: "Ошибка при поиске Series." });
    }
  }

  static async create(req: Request, res: Response) {
    /**
     * Ожидаем тело:
     * {
     *   trainingId: number,
     *   beginTimeOffset: number,
     *   endTimeOffset?: number
     * }
     */
    const { trainingId, beginTimeOffset, endTimeOffset } = req.body;
    if (
      typeof trainingId !== "number" ||
      typeof beginTimeOffset !== "number"
    ) {
      return res.status(400).json({ error: "Неверный набор полей." });
    }

    try {
      const training = await trRepo.findOneBy({ id: trainingId });
      if (!training) return res.status(404).json({ error: "Training не найден." });

      const newSeries = seriesRepo.create({
        training,
        beginTimeOffset,
        endTimeOffset: typeof endTimeOffset === "number" ? endTimeOffset : null,
      });
      await seriesRepo.save(newSeries);
      return res.status(201).json(newSeries);
    } catch {
      return res.status(500).json({ error: "Не удалось создать Series." });
    }
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const { beginTimeOffset, endTimeOffset } = req.body;
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });

    try {
      const series = await seriesRepo.findOne({ where: { id } });
      if (!series) return res.status(404).json({ error: "Не найдено." });

      if (typeof beginTimeOffset === "number") series.beginTimeOffset = beginTimeOffset;
      if (typeof endTimeOffset === "number") series.endTimeOffset = endTimeOffset;

      await seriesRepo.save(series);
      return res.json(series);
    } catch {
      return res.status(500).json({ error: "Не удалось обновить Series." });
    }
  }

  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });
    try {
      const result = await seriesRepo.delete(id);
      if (result.affected === 0) return res.status(404).json({ error: "Не найдено." });
      return res.json({ message: "Удалено." });
    } catch {
      return res.status(500).json({ error: "Ошибка при удалении Series." });
    }
  }
}
