import { Request, Response } from "express";
import AppDataSource from "../app-data-source";
import { File } from "../entities/File";

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

  async createFile(req: Request, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(File);
    const newFile = repo.create(req.body);
    const result = await repo.save(newFile);
    res.status(201).json(result);
  },

  async updateFile(req: Request, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(File);
    const file = await repo.findOneBy({ file_id: Number(req.params.id) });

    if (!file) {
      res.status(404).json({ message: "File not found" });
      return;
    }

    repo.merge(file, req.body);
    const result = await repo.save(file);
    res.json(result);
  },

  async deleteFile(req: Request, res: Response): Promise<void> {
    const result = await AppDataSource.getRepository(File).delete({
      file_id: Number(req.params.id),
    });
    res.json(result);
  }
};
