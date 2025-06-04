import { Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { Shot } from "../entities/Shot";
import { Series } from "../entities/Series";

const shotRepo = AppDataSource.getRepository(Shot);
const seriesRepo = AppDataSource.getRepository(Series);

export class ShotController {
  static async getAll(_req: Request, res: Response) {
    try {
      const list = await shotRepo.find({ relations: ["series"] });
      return res.json(list);
    } catch {
      return res.status(500).json({ error: "Не удалось получить Shot." });
    }
  }

  static async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });
    try {
      const item = await shotRepo.findOne({
        where: { id },
        relations: ["series"],
      });
      if (!item) return res.status(404).json({ error: "Не найдено." });
      return res.json(item);
    } catch {
      return res.status(500).json({ error: "Ошибка при поиске Shot." });
    }
  }

  static async create(req: Request, res: Response) {
    /**
     * Ожидаем тело:
     * {
     *   seriesId: number,
     *   order: number,
     *   x: string (decimal),
     *   y: string (decimal),
     *   score: string (decimal),
     *   timeOffset: number
     * }
     */
    const { seriesId, order, x, y, score, timeOffset } = req.body;
    if (
      typeof seriesId !== "number" ||
      typeof order !== "number" ||
      !x ||
      !y ||
      !score ||
      typeof timeOffset !== "number"
    ) {
      return res.status(400).json({ error: "Неверный набор полей." });
    }

    try {
      const series = await seriesRepo.findOneBy({ id: seriesId });
      if (!series) return res.status(404).json({ error: "Series не найден." });

      const newShot = shotRepo.create({
        series,
        order,
        x,
        y,
        score,
        timeOffset,
      });
      await shotRepo.save(newShot);
      return res.status(201).json(newShot);
    } catch (e) {
      return res.status(500).json({ error: "Не удалось создать Shot." });
    }
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const { order, x, y, score, timeOffset } = req.body;
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });
    try {
      const shot = await shotRepo.findOneBy({ id });
      if (!shot) return res.status(404).json({ error: "Не найдено." });

      if (typeof order === "number") shot.order = order;
      if (x) shot.x = x;
      if (y) shot.y = y;
      if (score) shot.score = score;
      if (typeof timeOffset === "number") shot.timeOffset = timeOffset;

      await shotRepo.save(shot);
      return res.json(shot);
    } catch {
      return res.status(500).json({ error: "Не удалось обновить Shot." });
    }
  }

  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });
    try {
      const result = await shotRepo.delete(id);
      if (result.affected === 0) return res.status(404).json({ error: "Не найдено." });
      return res.json({ message: "Удалено." });
    } catch {
      return res.status(500).json({ error: "Ошибка при удалении Shot." });
    }
  }
}
