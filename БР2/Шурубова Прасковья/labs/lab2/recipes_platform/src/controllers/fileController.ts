import { Request, Response } from "express";
import AppDataSource from "../app-data-source";
import { File } from "../entities/File";
import { RequestWithUser } from "../middleware/auth.middleware";

export const fileController = {
  async getAllFiles(req: Request, res: Response): Promise<void> {
    const files = await AppDataSource.getRepository(File).find({
      relations: ["user", "recipe", "article"],
    });
    res.json(files);
  },

  async getFileById(req: Request, res: Response): Promise<void> {
    const file = await AppDataSource.getRepository(File).findOne({
      where: { file_id: Number(req.params.id) },
      relations: ["user", "recipe", "article"],
    });

    if (!file) {
      res.status(404).json({ message: "File not found" });
      return;
    }

    res.json(file);
  },

  async createFile(req: RequestWithUser, res: Response): Promise<void> {
    const user_id = req.user.id;

    const repo = AppDataSource.getRepository(File);
    const newFile = repo.create({ ...req.body, user: { user_id } });
    const result = await repo.save(newFile);
    res.status(201).json(result);
  },

  async updateFile(req: RequestWithUser, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(File);
    const file = await repo.findOneBy({ file_id: Number(req.params.id) });

    if (!file) {
      res.status(404).json({ message: "File not found" });
      return;
    }

    if (file.user.user_id !== req.user.id) {
      res.status(403).json({ message: "Forbidden: you can only update your own files" });
      return;
    }

    repo.merge(file, req.body);
    const result = await repo.save(file);
    res.json(result);
  },

  async deleteFile(req: RequestWithUser, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(File);
    const file = await repo.findOneBy({ file_id: Number(req.params.id) });

    if (!file) {
      res.status(404).json({ message: "File not found" });
      return;
    }

    if (file.user.user_id !== req.user.id) {
      res.status(403).json({ message: "Forbidden: you can only delete your own files" });
      return;
    }

    const result = await repo.delete({ file_id: Number(req.params.id) });
    res.json(result);
  }
};
