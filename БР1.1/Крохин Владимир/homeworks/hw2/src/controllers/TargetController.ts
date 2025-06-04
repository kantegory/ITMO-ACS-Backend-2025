// src/controllers/targetController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { Target } from "../entities/Target";

const targetRepo = AppDataSource.getRepository(Target);

export class TargetController {
  static async getAll(_req: Request, res: Response) {
    try {
      const list = await targetRepo.find();
      return res.json(list);
    } catch {
      return res.status(500).json({ error: "Не удалось получить Target." });
    }
  }

  static async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });
    try {
      const item = await targetRepo.findOneBy({ id });
      if (!item) return res.status(404).json({ error: "Не найдено." });
      return res.json(item);
    } catch {
      return res.status(500).json({ error: "Ошибка при поиске." });
    }
  }

  static async create(req: Request, res: Response) {
    const { name, description, imageBase64 } = req.body;
    if (!name || !description) return res.status(400).json({ error: "name и description обязательны." });
    try {
      const newItem = targetRepo.create({
        name,
        description,
        image: imageBase64 ? Buffer.from(imageBase64, "base64") : null,
      });
      await targetRepo.save(newItem);
      return res.status(201).json(newItem);
    } catch {
      return res.status(500).json({ error: "Не удалось создать Target." });
    }
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const { name, description, imageBase64 } = req.body;
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });

    try {
      const item = await targetRepo.findOneBy({ id });
      if (!item) return res.status(404).json({ error: "Не найдено." });

      if (name) item.name = name;
      if (description) item.description = description;
      if (imageBase64) item.image = Buffer.from(imageBase64, "base64");

      await targetRepo.save(item);
      return res.json(item);
    } catch {
      return res.status(500).json({ error: "Не удалось обновить Target." });
    }
  }

  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });
    try {
      const result = await targetRepo.delete(id);
      if (result.affected === 0) return res.status(404).json({ error: "Не найдено." });
      return res.json({ message: "Удалено." });
    } catch {
      return res.status(500).json({ error: "Ошибка при удалении Target." });
    }
  }
}
