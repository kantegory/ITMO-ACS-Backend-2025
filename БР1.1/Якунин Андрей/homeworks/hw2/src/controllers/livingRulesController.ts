import { Request, Response } from "express";
import { AppDataSource } from "../config/AppDataSourse";
import { LivingRules } from "../models/LivingRules";
import { Living } from "../models/Living";
import { Rules } from "../models/Rules";

const livingRulesRepo = AppDataSource.getRepository(LivingRules);
const livingRepo = AppDataSource.getRepository(Living);
const rulesRepo = AppDataSource.getRepository(Rules);

export const createLivingRules = async (req: Request, res: Response): Promise<void> => {
    try {
        const { livingId, rulesId } = req.body;
        const living = await livingRepo.findOne({ where: { id: livingId } });
        if (!living) {
            res.status(404).json({ message: `Living with ID ${livingId} not found` });
            return;
        }
        const rules = await rulesRepo.findOne({ where: { id: rulesId } });
        if (!rules) {
            res.status(404).json({ message: `Rules with ID ${rulesId} not found` });
            return;
        }
        const livingRules = livingRulesRepo.create({
            living,
            rules
        });
        const savedLivingRules = await livingRulesRepo.save(livingRules);
        res.status(201).json(savedLivingRules);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllLivingRules = async (req: Request, res: Response): Promise<void> => {
    try {
        const livingRules = await livingRulesRepo.find({
            relations: ["living", "rules"]
        });
        res.json(livingRules);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getLivingRulesById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const livingRules = await livingRulesRepo.findOne({
            where: { id },
            relations: ["living", "rules"]
        });
        if (!livingRules) {
            res.status(404).json({ message: "LivingRules not found" });
            return;
        }
        res.json(livingRules);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateLivingRules = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const livingRules = await livingRulesRepo.findOne({ where: { id } });
        if (!livingRules) {
            res.status(404).json({ message: "LivingRules not found" });
            return;
        }
        const { living, rules } = req.body;
        if (living) {
            livingRules.living = living;
        }
        if (rules) {
            livingRules.rules = rules;
        }
        const updatedLivingRules = await livingRulesRepo.save(livingRules);
        res.json(updatedLivingRules);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteLivingRules = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const result = await livingRulesRepo.delete(id);
        if (result.affected === 0) {
            res.status(404).json({ message: "LivingRules not found" });
            return;
        }
        res.json({ message: "LivingRules deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
