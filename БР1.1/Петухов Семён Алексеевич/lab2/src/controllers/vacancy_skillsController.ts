import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { VacancySkills } from "../models/vacancy_skillsModel";

const vacancySkillRepo = AppDataSource.getRepository(VacancySkills);

// Получить все связи "Навыки вакансии"
export const getAllVacancySkills = async (_: Request, res: Response) => {
    const items = await vacancySkillRepo.find({ relations: ["resume", "skill"] });
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
        relations: ["resume", "skill"],
    });

    if (!item) {
        res.status(404).json({ message: "VacancySkill not found" });
        return;
    }

    res.json(item);
};

// Создать новую связь "Навыки вакансии"
export const createVacancySkill = async (req: Request, res: Response) => {
    const { resume, skill } = req.body;

    if (!resume || !skill) {
        res.status(400).json({ message: "Missing required fields: resume and/or skill" });
        return;
    }

    const item = vacancySkillRepo.create(req.body);
    await vacancySkillRepo.save(item);
    res.status(201).json(item);
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
