import { Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { FreeTraining } from "../entities/FreeTraining";
import { Training } from "../entities/Training";
import { WeaponType } from "../entities/WeaponType";
import { Target } from "../entities/Target";

const ftRepo = AppDataSource.getRepository(FreeTraining);
const trRepo = AppDataSource.getRepository(Training);
const wtRepo = AppDataSource.getRepository(WeaponType);
const tgtRepo = AppDataSource.getRepository(Target);

export class FreeTrainingController {
  static async getAll(_req: Request, res: Response) {
    try {
      const list = await ftRepo.find({ relations: ["training", "weaponType", "target"] });
      return res.json(list);
    } catch {
      return res.status(500).json({ error: "Не удалось получить FreeTraining." });
    }
  }

  static async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });
    try {
      const item = await ftRepo.findOne({
        where: { id },
        relations: ["training", "weaponType", "target"],
      });
      if (!item) return res.status(404).json({ error: "Не найдено." });
      return res.json(item);
    } catch {
      return res.status(500).json({ error: "Ошибка при поиске FreeTraining." });
    }
  }

  static async create(req: Request, res: Response) {
    /**
     * Ожидаем тело:
     * {
     *   trainingId: number,
     *   weaponTypeId: number,
     *   targetId: number
     * }
     */
    const { trainingId, weaponTypeId, targetId } = req.body;
    if (typeof trainingId !== "number" || typeof weaponTypeId !== "number" || typeof targetId !== "number") {
      return res.status(400).json({ error: "Неверный набор полей." });
    }

    try {
      const training = await trRepo.findOneBy({ id: trainingId });
      if (!training) return res.status(404).json({ error: "Training не найден." });

      const wt = await wtRepo.findOneBy({ id: weaponTypeId });
      if (!wt) return res.status(404).json({ error: "WeaponType не найден." });

      const tgt = await tgtRepo.findOneBy({ id: targetId });
      if (!tgt) return res.status(404).json({ error: "Target не найден." });

      const existing = await ftRepo.findOne({ where: { training: { id: trainingId } } });
      if (existing) return res.status(409).json({ error: "FreeTraining для этого Training уже существует." });

      const newFt = ftRepo.create({
        training,
        weaponType: wt,
        target: tgt,
      });
      await ftRepo.save(newFt);
      return res.status(201).json(newFt);
    } catch {
      return res.status(500).json({ error: "Не удалось создать FreeTraining." });
    }
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const { weaponTypeId, targetId } = req.body;
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });

    try {
      const ft = await ftRepo.findOne({ where: { id }, relations: ["weaponType", "target"] });
      if (!ft) return res.status(404).json({ error: "Не найдено." });

      if (typeof weaponTypeId === "number") {
        const wt = await wtRepo.findOneBy({ id: weaponTypeId });
        if (!wt) return res.status(404).json({ error: "WeaponType не найден." });
        ft.weaponType = wt;
      }
      if (typeof targetId === "number") {
        const tgt = await tgtRepo.findOneBy({ id: targetId });
        if (!tgt) return res.status(404).json({ error: "Target не найден." });
        ft.target = tgt;
      }

      await ftRepo.save(ft);
      return res.json(ft);
    } catch {
      return res.status(500).json({ error: "Не удалось обновить FreeTraining." });
    }
  }

  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Неверный ID." });
    try {
      const result = await ftRepo.delete(id);
      if (result.affected === 0) return res.status(404).json({ error: "Не найдено." });
      return res.json({ message: "Удалено." });
    } catch {
      return res.status(500).json({ error: "Ошибка при удалении FreeTraining." });
    }
  }
}
