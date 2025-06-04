import { Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { Exercise } from "../entities/Exercise";
import { WeaponType } from "../entities/WeaponType";
import { Target } from "../entities/Target";

const exRepo = AppDataSource.getRepository(Exercise);
const wtRepo = AppDataSource.getRepository(WeaponType);
const targetRepo = AppDataSource.getRepository(Target);

export class ExerciseController {
  static async getAll(_req: Request, res: Response) {
    try {
      const list = await exRepo.find({ relations: ["weaponType", "target"] });
      return res.json(list);
    } catch {
      return res.status(500).json({ error: "Не удалось получить Exercise." });
    }
  }

  static async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });
    try {
      const item = await exRepo.findOne({ where: { id }, relations: ["weaponType", "target"] });
      if (!item) return res.status(404).json({ error: "Не найдено." });
      return res.json(item);
    } catch {
      return res.status(500).json({ error: "Ошибка при поиске." });
    }
  }

  static async create(req: Request, res: Response) {
    const { weaponTypeId, targetId, shots, shotsInSeries, duration, description } = req.body;
    if (
      typeof weaponTypeId !== "number" ||
      typeof targetId !== "number" ||
      typeof shots !== "number" ||
      typeof shotsInSeries !== "number" ||
      typeof duration !== "number" ||
      !description
    ) {
      return res.status(400).json({ error: "Неверный набор полей." });
    }

    try {
      const wt = await wtRepo.findOneBy({ id: weaponTypeId });
      if (!wt) return res.status(404).json({ error: "WeaponType не найден." });
      const tgt = await targetRepo.findOneBy({ id: targetId });
      if (!tgt) return res.status(404).json({ error: "Target не найден." });

      const newEx = exRepo.create({
        weaponType: wt,
        target: tgt,
        shots,
        shotsInSeries,
        duration,
        description,
      });
      await exRepo.save(newEx);
      return res.status(201).json(newEx);
    } catch {
      return res.status(500).json({ error: "Не удалось создать Exercise." });
    }
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const { weaponTypeId, targetId, shots, shotsInSeries, duration, description } = req.body;
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });

    try {
      const ex = await exRepo.findOne({ where: { id }, relations: ["weaponType", "target"] });
      if (!ex) return res.status(404).json({ error: "Не найдено." });

      if (typeof weaponTypeId === "number") {
        const wt = await wtRepo.findOneBy({ id: weaponTypeId });
        if (!wt) return res.status(404).json({ error: "WeaponType не найден." });
        ex.weaponType = wt;
      }
      if (typeof targetId === "number") {
        const tgt = await targetRepo.findOneBy({ id: targetId });
        if (!tgt) return res.status(404).json({ error: "Target не найден." });
        ex.target = tgt;
      }
      if (typeof shots === "number") ex.shots = shots;
      if (typeof shotsInSeries === "number") ex.shotsInSeries = shotsInSeries;
      if (typeof duration === "number") ex.duration = duration;
      if (description) ex.description = description;

      await exRepo.save(ex);
      return res.json(ex);
    } catch {
      return res.status(500).json({ error: "Не удалось обновить Exercise." });
    }
  }

  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });
    try {
      const result = await exRepo.delete(id);
      if (result.affected === 0) return res.status(404).json({ error: "Не найдено." });
      return res.json({ message: "Удалено." });
    } catch {
      return res.status(500).json({ error: "Ошибка при удалении Exercise." });
    }
  }
}
