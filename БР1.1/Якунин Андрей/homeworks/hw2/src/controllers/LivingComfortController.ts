import { Request, Response } from "express";
import { LivingComfort } from "../models/LivingComfort";
import { AppDataSource } from "../config/AppDataSourse";
import { Living } from "../models/Living";
import { Comfort } from "../models/Comfort";

const livingComfortRepo = AppDataSource.getRepository(LivingComfort);

export const getAllLivingComforts = async (req: Request, res: Response) => {
    try {
        const livingComforts = await livingComfortRepo.find({
            relations: ['living', 'comfort'],
        });
        res.json(livingComforts);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getLivingComfortById = async (req: Request, res: Response) => {
    try {
        const livingComfort = await livingComfortRepo.findOne({
            where: { id: Number(req.params.id) },
            relations: ['living', 'comfort'],
        });
        if (!livingComfort) {
            res.status(404).json({ message: 'LivingComfort not found' });
            return;
        }
        res.json(livingComfort);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const createLivingComfort = async (req: Request, res: Response) => {
    try {
        const { livingId, comfortId } = req.body;
        const living = await AppDataSource.getRepository(Living).findOne({ where: { id: livingId } });
        const comfort = await AppDataSource.getRepository(Comfort).findOne({ where: { id: comfortId } });
        if (!living || !comfort) {
            res.status(404).json({ message: "Living or Comfort not found" });
            return;
        }
        const livingComfort = livingComfortRepo.create({ living, comfort });
        const savedLivingComfort = await livingComfortRepo.save(livingComfort);
        res.status(201).json(savedLivingComfort);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const updateLivingComfort = async (req: Request, res: Response) => {
    try {
        const { livingId, comfortId } = req.body;
        const livingComfort = await livingComfortRepo.findOne({ where: { id: Number(req.params.id) } });
        if (!livingComfort) {
            res.status(404).json({ message: "LivingComfort not found" });
            return;
        }
        const living = await AppDataSource.getRepository(Living).findOne({ where: { id: livingId } });
        const comfort = await AppDataSource.getRepository(Comfort).findOne({ where: { id: comfortId } });
        if (!living || !comfort) {
            res.status(404).json({ message: "Living or Comfort not found" });
            return;
        }
        livingComfort.living = living;
        livingComfort.comfort = comfort;
        const updatedLivingComfort = await livingComfortRepo.save(livingComfort);
        res.json(updatedLivingComfort);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const deleteLivingComfort = async (req: Request, res: Response) => {
    try {
        const result = await livingComfortRepo.delete(req.params.id);
        if (result.affected === 0) {
            res.status(404).json({ message: "LivingComfort not found" });
            return;
        }
        res.json({ message: "LivingComfort deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
