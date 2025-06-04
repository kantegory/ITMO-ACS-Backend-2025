import { Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { TrainingNote } from "../entities/TrainingNote";
import { Note } from "../entities/Note";
import { Training } from "../entities/Training";

const tnRepo = AppDataSource.getRepository(TrainingNote);
const noteRepo = AppDataSource.getRepository(Note);
const trRepo = AppDataSource.getRepository(Training);

export class TrainingNoteController {
  static async getAll(_req: Request, res: Response) {
    try {
      const list = await tnRepo.find({ relations: ["note", "training"] });
      return res.json(list);
    } catch {
      return res.status(500).json({ error: "Не удалось получить TrainingNotes." });
    }
  }

  static async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });
    try {
      const item = await tnRepo.findOne({
        where: { id },
        relations: ["note", "training"],
      });
      if (!item) return res.status(404).json({ error: "Не найдено." });
      return res.json(item);
    } catch {
      return res.status(500).json({ error: "Ошибка при поиске TrainingNote." });
    }
  }

  static async create(req: Request, res: Response) {
    /**
     * Ожидаем тело:
     * {
     *   noteId: number,
     *   trainingId: number
     * }
     */
    const { noteId, trainingId } = req.body;
    if (typeof noteId !== "number" || typeof trainingId !== "number") {
      return res.status(400).json({ error: "Неверный набор полей." });
    }

    try {
      const note = await noteRepo.findOneBy({ id: noteId });
      if (!note) return res.status(404).json({ error: "Note не найден." });
      const tr = await trRepo.findOneBy({ id: trainingId });
      if (!tr) return res.status(404).json({ error: "Training не найден." });

      const existing = await tnRepo.findOne({ where: { note: { id: noteId }, training: { id: trainingId } } });
      if (existing) return res.status(409).json({ error: "Такой связанный TrainingNote уже существует." });

      const newTN = tnRepo.create({ note, training: tr });
      await tnRepo.save(newTN);
      return res.status(201).json(newTN);
    } catch {
      return res.status(500).json({ error: "Не удалось создать TrainingNote." });
    }
  }

  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });
    try {
      const result = await tnRepo.delete(id);
      if (result.affected === 0) return res.status(404).json({ error: "Не найдено." });
      return res.json({ message: "Удалено." });
    } catch {
      return res.status(500).json({ error: "Ошибка при удалении TrainingNote." });
    }
  }
}
