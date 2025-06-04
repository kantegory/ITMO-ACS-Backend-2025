import { Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { WeaponType } from "../entities/WeaponType";

const wtRepo = AppDataSource.getRepository(WeaponType);

export class WeaponTypeController {
  static async getAll(_req: Request, res: Response) {
    try {
      const list = await wtRepo.find();
      return res.json(list);
    } catch {
      return res.status(500).json({ error: "Не удалось получить WeaponType." });
    }
  }

  static async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });
    try {
      const item = await wtRepo.findOneBy({ id });
      if (!item) return res.status(404).json({ error: "Не найдено." });
      return res.json(item);
    } catch {
      return res.status(500).json({ error: "Ошибка при поиске." });
    }
  }

  static async create(req: Request, res: Response) {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Название обязательно." });
    try {
      const newItem = wtRepo.create({ name });
      await wtRepo.save(newItem);
      return res.status(201).json(newItem);
    } catch {
      return res.status(500).json({ error: "Не удалось создать WeaponType." });
    }
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });
    if (!name) return res.status(400).json({ error: "Название обязательно." });
    try {
      const item = await wtRepo.findOneBy({ id });
      if (!item) return res.status(404).json({ error: "Не найдено." });
      item.name = name;
      await wtRepo.save(item);
      return res.json(item);
    } catch {
      return res.status(500).json({ error: "Не удалось обновить WeaponType." });
    }
  }

  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });
    try {
      const result = await wtRepo.delete(id);
      if (result.affected === 0) return res.status(404).json({ error: "Не найдено." });
      return res.json({ message: "Удалено." });
    } catch {
      return res.status(500).json({ error: "Ошибка при удалении WeaponType." });
    }
  }
}
