import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { VacancySkills } from "../models/vacancy_skillsModel";
import { Vacancy } from "../models/vacancyModel";
import { Not } from "typeorm";
import axios from "axios";

const vacancySkillRepo = AppDataSource.getRepository(VacancySkills);
const vacancyRepo = AppDataSource.getRepository(Vacancy);

// Вспомогательная функция проверки skillId
const verifySkillExists = async (skillId: number): Promise<boolean> => {
    try {
        const response = await axios.get(`http://skill-service:3005/skill-service/skill/${skillId}`);
        return response.status === 200;
    } catch {
        return false;
    }
};

// Получить все связи VacancySkills
export const getAllVacancySkills = async (_: Request, res: Response) => {
    const items = await vacancySkillRepo.find({ relations: ["vacancy"] });
    res.json(items);
};

// Получить связь по ID
export const getVacancySkillById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await vacancySkillRepo.findOne({
        where: { id },
        relations: ["vacancy"],
    });

    if (!item) {
        res.status(404).json({ message: "VacancySkill not found" });
        return;
    }

    res.json(item);
};

// Создать связь Vacancy - Skill
export const createVacancySkill = async (req: Request, res: Response) => {
    const { vacancyId, skillId } = req.body;

    if (!vacancyId || !skillId) {
        return res.status(400).json({ message: "Missing vacancyId or skillId" });
    }

    const vacancyEntity = await vacancyRepo.findOneBy({ id: vacancyId });
    if (!vacancyEntity) {
        return res.status(404).json({ message: "Vacancy not found" });
    }

    const skillExists = await verifySkillExists(skillId);
    if (!skillExists) {
        return res.status(404).json({ message: `Skill with id ${skillId} not found in skill service` });
    }

    const existing = await vacancySkillRepo.findOne({
        where: { vacancy: { id: vacancyId }, skillId },
    });
    if (existing) {
        return res.status(409).json({ message: "This skill is already associated with the vacancy" });
    }

    const newItem = vacancySkillRepo.create({
        vacancy: vacancyEntity,
        skillId,
    });

    await vacancySkillRepo.save(newItem);
    return res.status(201).json(newItem);
};

// Обновить связь
export const updateVacancySkill = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }

    const item = await vacancySkillRepo.findOne({ where: { id }, relations: ["vacancy"] });
    if (!item) {
        res.status(404).json({ message: "VacancySkill not found" });
        return;
    }

    const { vacancyId, skillId } = req.body;

    if (vacancyId !== undefined) {
        const vacancyEntity = await vacancyRepo.findOneBy({ id: vacancyId });
        if (!vacancyEntity) {
            return res.status(404).json({ message: "Vacancy not found" });
        }
        item.vacancy = vacancyEntity;
    }

    if (skillId !== undefined) {
        const skillExists = await verifySkillExists(skillId);
        if (!skillExists) {
            return res.status(404).json({ message: `Skill with id ${skillId} not found in skill service` });
        }
        item.skillId = skillId;
    }

    const existing = await vacancySkillRepo.findOne({
        where: {
            vacancy: { id: item.vacancy.id },
            skillId: item.skillId,
            id: Not(id),
        },
    });
    if (existing) {
        return res.status(409).json({ message: "This skill is already associated with the vacancy" });
    }

    await vacancySkillRepo.save(item);
    res.json(item);
};

// Удалить связь
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

    res.status(204).send();
};
