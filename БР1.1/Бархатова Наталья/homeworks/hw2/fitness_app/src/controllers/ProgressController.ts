import { Request, Response } from "express";
import { AppDataSource } from "../AppDataSource";
import { Progress } from "../models/Progress";

const progressRepo = AppDataSource.getRepository(Progress);

export const createProgress = async (req: Request, res: Response) => {
  try {
    const progressData = req.body;
    const progress = progressRepo.create(progressData);
    const savedProgress = await progressRepo.save(progress);
    res.status(201).json(savedProgress);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProgress = async (req: Request, res: Response) => {
  try {
    const progressList = await progressRepo.find();
    res.json(progressList);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProgressById = async (req: Request, res: Response): Promise<any> => {
  try {
    const progress = await progressRepo.findOne({ where: { id: req.params.id }, relations: ["user"] });
    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }
    res.json(progress);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProgress = async (req: Request, res: Response): Promise<any> => {
  try {
    const progress = await progressRepo.findOne({ where: { id: req.params.id } });
    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }

    progressRepo.merge(progress, req.body);
    const updatedProgress = await progressRepo.save(progress);
    res.json(updatedProgress);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProgress = async (req: Request, res: Response): Promise<any> => {
  try {
    const result = await progressRepo.delete(req.params.id);
    if (result.affected === 0) {
      return res.status(404).json({ message: "Progress not found" });
    }
    res.json({ message: "Progress deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
