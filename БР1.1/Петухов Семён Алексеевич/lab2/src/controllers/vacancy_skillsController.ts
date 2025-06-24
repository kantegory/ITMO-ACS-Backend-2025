import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { VacancySkills } from "../models/vacancy_skillsModel";
import {Vacancy} from "../models/vacancyModel";
import {Skill} from "../models/skillModel";

const vacancySkillRepo = AppDataSource.getRepository(VacancySkills);
const vacancyRepo = AppDataSource.getRepository(Vacancy);
const skillRepo = AppDataSource.getRepository(Skill);

// Получить все связи "Навыки вакансии"
export const getAllVacancySkills = async (_: Request, res: Response) => {
    const items = await vacancySkillRepo.find({ relations: ["vacancy", "skill"] });
    res.json(items);
};

// Получить связь "Навыки вакансии" по ID
export const getVacancySkillById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await vacancySkillRepo.findOne({
        where: { id },
        relations: ["vacancy", "skill"],
    });

    if (!item) {
        res.status(404).json({ message: "VacancySkill not found" });
        return;
    }

    res.json(item);
};

// Создать новую связь "Навыки вакансии"
export const createVacancySkill = async (req: Request, res: Response) => {
    try {
        const { vacancy, skill } = req.body;

        if (!vacancy || !skill) {
            return res.status(400).json({ message: "Missing required fields: vacancy and/or skill" });
        }

        const vacancyEntity = await vacancyRepo.findOneBy({ id: vacancy });
        if (!vacancyEntity) {
            return res.status(404).json({ message: "Vacancy not found" });
        }

        const skillEntity = await skillRepo.findOneBy({ id: skill });
        if (!skillEntity) {
            return res.status(404).json({ message: "Skill not found" });
        }

        const existingEntry = await vacancySkillRepo.findOne({
            where: { vacancy: { id: vacancy }, skill: { id: skill } },
        });

        if (existingEntry) {
            return res.status(409).json({ message: "This skill is already associated with the vacancy" });
        }

        const item = vacancySkillRepo.create({
            vacancy: vacancyEntity,
            skill: skillEntity,
        });

        await vacancySkillRepo.save(item);
        return res.status(201).json(item);
    } catch (error) {
        console.error("Error creating VacancySkill:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};

// Обновить связь "Навыки вакансии"
export const updateVacancySkill = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await vacancySkillRepo.findOneBy({ id });
    if (!item) {
        res.status(404).json({ message: "VacancySkill not found" });
        return;
    }

    vacancySkillRepo.merge(item, req.body);
    await vacancySkillRepo.save(item);
    res.json(item);
};

// Удалить связь "Навыки вакансии"
export const deleteVacancySkill = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const result = await vacancySkillRepo.delete(id);
    if (result.affected === 0) {
        res.status(404).json({ message: "VacancySkill not found" });
        return;
    }

    res.json({ deleted: result.affected });
};
