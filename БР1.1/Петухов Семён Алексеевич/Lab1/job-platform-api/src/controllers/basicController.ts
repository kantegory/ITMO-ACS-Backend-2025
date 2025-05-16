import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { BasicModel } from "../models/basicModel";

const basicRepo = AppDataSource.getRepository(BasicModel);

// Получить все записи
export const getAll = async (_: Request, res: Response) => {
    const items = await basicRepo.find();
    res.json(items);
};

// Получить запись по ID
export const getOne = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const item = await basicRepo.findOneBy({ id });

    if (!item) {
        return res.status(404).json({ message: "Not found" });
    }

    res.json(item);
};

// Создать новую запись
export const create = async (req: Request, res: Response) => {
    const { ColumnString } = req.body;

    const newItem = basicRepo.create({ ColumnString });

    await basicRepo.save(newItem);
    res.status(201).json(newItem);
};

// Обновить запись
export const update = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const item = await basicRepo.findOneBy({ id });

    if (!item) {
        return res.status(404).json({ message: "Not found" });
    }

    const { ColumnString } = req.body;
    item.ColumnString = ColumnString;

    await basicRepo.save(item);
    res.json(item);
};

// Удалить запись
export const remove = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const item = await basicRepo.findOneBy({ id });

    if (!item) {
        return res.status(404).json({ message: "Not found" });
    }

    await basicRepo.remove(item);
    res.status(204).send();
};