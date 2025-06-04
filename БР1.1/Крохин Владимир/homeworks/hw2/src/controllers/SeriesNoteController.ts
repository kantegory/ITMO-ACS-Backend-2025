import { Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { SeriesNote } from "../entities/SeriesNote";
import { Note } from "../entities/Note";
import { Series } from "../entities/Series";

const snRepo = AppDataSource.getRepository(SeriesNote);
const noteRepo = AppDataSource.getRepository(Note);
const seriesRepo = AppDataSource.getRepository(Series);

export class SeriesNoteController {
  static async getAll(_req: Request, res: Response) {
    try {
      const list = await snRepo.find({ relations: ["note", "series"] });
      return res.json(list);
    } catch {
      return res.status(500).json({ error: "Не удалось получить SeriesNotes." });
    }
  }

  static async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });
    try {
      const item = await snRepo.findOne({
        where: { id },
        relations: ["note", "series"],
      });
      if (!item) return res.status(404).json({ error: "Не найдено." });
      return res.json(item);
    } catch {
      return res.status(500).json({ error: "Ошибка при поиске SeriesNote." });
    }
  }

  static async create(req: Request, res: Response) {
    /**
     * Ожидаем тело:
     * {
     *   noteId: number,
     *   seriesId: number
     * }
     */
    const { noteId, seriesId } = req.body;
    if (typeof noteId !== "number" || typeof seriesId !== "number") {
      return res.status(400).json({ error: "Неверный набор полей." });
    }

    try {
      const note = await noteRepo.findOneBy({ id: noteId });
      if (!note) return res.status(404).json({ error: "Note не найден." });
      const series = await seriesRepo.findOneBy({ id: seriesId });
      if (!series) return res.status(404).json({ error: "Series не найден." });

      const existing = await snRepo.findOne({ where: { note: { id: noteId }, series: { id: seriesId } } });
      if (existing) return res.status(409).json({ error: "Такой связанный SeriesNote уже существует." });

      const newSN = snRepo.create({ note, series });
      await snRepo.save(newSN);
      return res.status(201).json(newSN);
    } catch {
      return res.status(500).json({ error: "Не удалось создать SeriesNote." });
    }
  }

  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });
    try {
      const result = await snRepo.delete(id);
      if (result.affected === 0) return res.status(404).json({ error: "Не найдено." });
      return res.json({ message: "Удалено." });
    } catch {
      return res.status(500).json({ error: "Ошибка при удалении SeriesNote." });
    }
  }
}
