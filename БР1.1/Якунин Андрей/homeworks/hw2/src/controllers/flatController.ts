import { Request, Response } from "express";
import { AppDataSource } from "../config/AppDataSourse";
import { Flat } from "../models/Flat";

const flatRepo = AppDataSource.getRepository(Flat);

export const createFlat = async (req: Request, res: Response) => {
    try {
        const flatData = req.body;
        const flat = flatRepo.create(flatData);
        const savedFlat = await flatRepo.save(flat);
        res.status(200).json(savedFlat);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllFlats = async (req: Request, res: Response) => {
    try {
        const flats = await flatRepo.find();
        res.json(flats);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getFlatById = async (req: Request, res: Response):Promise<any> => {
    try {
        const flat = await flatRepo.findOne({ where: { id: Number(req.params.id) } });
        if (!flat) {
            return res.status(404).json({ message: "Flat not found" });
        }
        res.json(flat);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateFlat = async (req: Request, res: Response):Promise<any> => {
    try {
        const flat = await flatRepo.findOne({ where: { id: Number(req.params.id) } });
        if (!flat) {
            return res.status(404).json({ message: "Flat not found" });
        }
        flatRepo.merge(flat, req.body);
        const updatedFlat = await flatRepo.save(flat);
        res.json(updatedFlat);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteFlat = async (req: Request, res: Response):Promise<any> => {
    try {
        const result = await flatRepo.delete(req.params.id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Flat not found" });
        }
        res.json({ message: "Flat deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
