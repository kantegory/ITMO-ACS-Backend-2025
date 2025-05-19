import { Request, Response } from "express";
import { AppDataSource } from "../config/AppDataSourse";
import { Living } from "../models/Living";

const livingRepo = AppDataSource.getRepository(Living);

export const createLiving = async (req: Request, res: Response) => {
    try {
        const livingData = req.body;
        const living = livingRepo.create(livingData);
        const savedLiving = await livingRepo.save(living);
        res.status(200).json(savedLiving);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllLiving = async (req: Request, res: Response) => {
    try {
        const livings = await livingRepo.find();
        res.json(livings);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getLivingById = async (req: Request, res: Response): Promise<any> => {
    try {
        const living = await livingRepo.findOne({ where: { id: Number(req.params.id) } });
        if (!living) {
            return res.status(404).json({ message: "Living not found" });
        }
        res.json(living);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateLiving = async (req: Request, res: Response): Promise<any> => {
    try {
        const living = await livingRepo.findOne({ where: { id: Number(req.params.id) } });
        if (!living) {
            return res.status(404).json({ message: "Living not found" });
        }
        livingRepo.merge(living, req.body);
        const updatedLiving = await livingRepo.save(living);
        res.json(updatedLiving);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteLiving = async (req: Request, res: Response): Promise<any> => {
    try {
        const result = await livingRepo.delete(req.params.id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Living not found" });
        }
        res.json({ message: "Living deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
