import { Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { QualificationTraining } from "../entities/QualificationTraining";
import { Training } from "../entities/Training";
import { Exercise } from "../entities/Exercise";

const qtRepo = AppDataSource.getRepository(QualificationTraining);
const trRepo = AppDataSource.getRepository(Training);
const exRepo = AppDataSource.getRepository(Exercise);

export class QualificationTrainingController {
  static async getAll(_req: Request, res: Response) {
    try {
      const list = await qtRepo.find({ relations: ["training", "exercise"] });
      return res.json(list);
    } catch {
      return res.status(500).json({ error: "Не удалось получить QualificationTraining." });
    }
  }

  static async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });
    try {
      const item = await qtRepo.findOne({
        where: { id },
        relations: ["training", "exercise"],
      });
      if (!item) return res.status(404).json({ error: "Не найдено." });
      return res.json(item);
    } catch {
      return res.status(500).json({ error: "Ошибка при поиске QualificationTraining." });
    }
  }

  static async create(req: Request, res: Response) {
    /**
     * Ожидаем тело:
     * {
     *   trainingId: number,
     *   exerciseId: number
     * }
     */
    const { trainingId, exerciseId } = req.body;
    if (typeof trainingId !== "number" || typeof exerciseId !== "number") {
      return res.status(400).json({ error: "Неверный набор полей." });
    }

    try {
      const training = await trRepo.findOneBy({ id: trainingId });
      if (!training) return res.status(404).json({ error: "Training не найден." });

      const exercise = await exRepo.findOneBy({ id: exerciseId });
      if (!exercise) return res.status(404).json({ error: "Exercise не найден." });

      const existing = await qtRepo.findOne({ where: { training: { id: trainingId } } });
      if (existing) {
        return res.status(409).json({ error: "QualificationTraining для этого Training уже существует." });
      }

      const newQt = qtRepo.create({ training, exercise });
      await qtRepo.save(newQt);
      return res.status(201).json(newQt);
    } catch {
      return res.status(500).json({ error: "Не удалось создать QualificationTraining." });
    }
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const { exerciseId } = req.body;
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });

    try {
      const qt = await qtRepo.findOne({ where: { id }, relations: ["exercise"] });
      if (!qt) return res.status(404).json({ error: "Не найдено." });

      if (typeof exerciseId === "number") {
        const exercise = await exRepo.findOneBy({ id: exerciseId });
        if (!exercise) return res.status(404).json({ error: "Exercise не найден." });
        qt.exercise = exercise;
      }

      await qtRepo.save(qt);
      return res.json(qt);
    } catch {
      return res.status(500).json({ error: "Не удалось обновить QualificationTraining." });
    }
  }

  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });

    try {
      const result = await qtRepo.delete(id);
      if (result.affected === 0) return res.status(404).json({ error: "Не найдено." });
      return res.json({ message: "Удалено." });
    } catch {
      return res.status(500).json({ error: "Ошибка при удалении QualificationTraining." });
    }
  }
}
