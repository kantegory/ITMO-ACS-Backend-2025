import { Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { Note } from "../entities/Note";
import { User } from "../entities/User";

const noteRepo = AppDataSource.getRepository(Note);
const userRepo = AppDataSource.getRepository(User);

export class NoteController {
  static async getAll(_req: Request, res: Response) {
    try {
      const list = await noteRepo.find({ relations: ["user", "trainingNotes", "seriesNotes"] });
      return res.json(list);
    } catch {
      return res.status(500).json({ error: "Не удалось получить Note." });
    }
  }

  static async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });
    try {
      const item = await noteRepo.findOne({
        where: { id },
        relations: ["user", "trainingNotes", "seriesNotes"],
      });
      if (!item) return res.status(404).json({ error: "Не найдено." });
      return res.json(item);
    } catch {
      return res.status(500).json({ error: "Ошибка при поиске Note." });
    }
  }

  static async create(req: Request, res: Response) {
    /**
     * Ожидаем тело:
     * {
     *   userId: number,
     *   content: string
     * }
     */
    const { userId, content } = req.body;
    if (typeof userId !== "number" || typeof content !== "string" || content.length < 10) {
      return res.status(400).json({ error: "Неверный набор полей." });
    }

    try {
      const user = await userRepo.findOneBy({ id: userId });
      if (!user) return res.status(404).json({ error: "Пользователь не найден." });

      const newNote = noteRepo.create({
        user,
        content,
      });
      // editedAt/createdAt заполнятся по умолчанию
      await noteRepo.save(newNote);
      return res.status(201).json(newNote);
    } catch {
      return res.status(500).json({ error: "Не удалось создать Note." });
    }
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const { content } = req.body;
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });
    if (typeof content !== "string" || content.length < 10) {
      return res.status(400).json({ error: "content должен быть не короче 10 символов." });
    }

    try {
      const note = await noteRepo.findOneBy({ id });
      if (!note) return res.status(404).json({ error: "Не найдено." });
      note.content = content;
      note.editedAt = new Date(); // обновляем время редактирования
      await noteRepo.save(note);
      return res.json(note);
    } catch {
      return res.status(500).json({ error: "Не удалось обновить Note." });
    }
  }

  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });
    try {
      const result = await noteRepo.delete(id);
      if (result.affected === 0) return res.status(404).json({ error: "Не найдено." });
      return res.json({ message: "Удалено." });
    } catch {
      return res.status(500).json({ error: "Ошибка при удалении Note." });
    }
  }
}
