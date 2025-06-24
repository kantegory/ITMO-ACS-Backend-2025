import { Request, Response } from "express";
import { AppDataSource } from "../config/AppDataSourse";
import { Rules } from "../models/Rules";

const rulesRepo = AppDataSource.getRepository(Rules);

export const createRules = async (req: Request, res: Response): Promise<any> => {
    try {
        const rulesData = req.body;
        const rules = rulesRepo.create(rulesData);
        const savedRules = await rulesRepo.save(rules);
        res.status(201).json(savedRules);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllRules = async (req: Request, res: Response): Promise<any> => {
    try {
        const rules = await rulesRepo.find({ relations: ["livingRules"] });
        res.json(rules);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getRulesById = async (req: Request, res: Response): Promise<any> => {
    try {
        const id = Number(req.params.id);
        const rules = await rulesRepo.findOne({
            where: { id },
            relations: ["livingRules"]
        });
        if (!rules) {
            return res.status(404).json({ message: "Rules not found" });
        }
        res.json(rules);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRules = async (req: Request, res: Response): Promise<any> => {
    try {
        const id = Number(req.params.id);
        const rules = await rulesRepo.findOne({ where: { id } });
        if (!rules) {
            return res.status(404).json({ message: "Rules not found" });
        }
        const {
            check_in_after,
            departure_before,
            guest_count,
            with_child,
            with_animals,
            allowed_smoking,
            allowed_parties,
            report_docs
        } = req.body;
        if (check_in_after !== undefined) rules.check_in_after = check_in_after;
        if (departure_before !== undefined) rules.departure_before = departure_before;
        if (guest_count !== undefined) rules.guest_count = guest_count;
        if (with_child !== undefined) rules.with_child = with_child;
        if (with_animals !== undefined) rules.with_animals = with_animals;
        if (allowed_smoking !== undefined) rules.allowed_smoking = allowed_smoking;
        if (allowed_parties !== undefined) rules.allowed_parties = allowed_parties;
        if (report_docs !== undefined) rules.report_docs = report_docs;
        const updatedRules = await rulesRepo.save(rules);
        res.json(updatedRules);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteRules = async (req: Request, res: Response): Promise<any> => {
    try {
        const id = Number(req.params.id);
        const result = await rulesRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Rules not found" });
        }
        res.json({ message: "Rules deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
