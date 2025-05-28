import { Request, Response } from "express";
import { AppDataSource } from "../AppDataSource";
import { TrainingPlan } from "../models/TrainingPlan";

const trainingPlanRepo = AppDataSource.getRepository(TrainingPlan);

export const createTrainingPlan = async (req: Request, res: Response) => {
  try {
    const trainingPlanData = req.body;
    const trainingPlan = trainingPlanRepo.create(trainingPlanData);
    const savedTrainingPlan = await trainingPlanRepo.save(trainingPlan);
    res.status(201).json(savedTrainingPlan);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTrainingPlans = async (req: Request, res: Response) => {
  try {
    const trainingPlans = await trainingPlanRepo.find();
    res.json(trainingPlans);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrainingPlanById = async (req: Request, res: Response): Promise<any> => {
  try {
    const trainingPlan = await trainingPlanRepo.findOne({ where: { id: req.params.id }, relations: ["user", "workout"] });
    if (!trainingPlan) {
      return res.status(404).json({ message: "Training plan not found" });
    }
    res.json(trainingPlan);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTrainingPlan = async (req: Request, res: Response): Promise<any> => {
  try {
    const trainingPlan = await trainingPlanRepo.findOne({ where: { id: req.params.id } });
    if (!trainingPlan) {
      return res.status(404).json({ message: "Training plan not found" });
    }

    trainingPlanRepo.merge(trainingPlan, req.body);
    const updatedTrainingPlan = await trainingPlanRepo.save(trainingPlan);
    res.json(updatedTrainingPlan);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTrainingPlan = async (req: Request, res: Response): Promise<any> => {
  try {
    const result = await trainingPlanRepo.delete(req.params.id);
    if (result.affected === 0) {
      return res.status(404).json({ message: "Training plan not found" });
    }
    res.json({ message: "Training plan deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
