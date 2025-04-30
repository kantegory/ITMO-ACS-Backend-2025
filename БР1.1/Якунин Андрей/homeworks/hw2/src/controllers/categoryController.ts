import { Request, Response } from "express";
import { AppDataSource } from "../config/AppDataSourse";
import { Category } from "../models/Category";

const categoryRepo = AppDataSource.getRepository(Category);

export const createCategory = async (req: Request, res: Response) => {
    try {
        const categoryData = req.body;
        const category = categoryRepo.create(categoryData);
        const savedCategory = await categoryRepo.save(category);
        res.status(201).json(savedCategory);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoryRepo.find();
        res.json(categories);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getCategoryById = async (req: Request, res: Response): Promise<any> => {
    try {
        const category = await categoryRepo.findOne({ where: { id: Number(req.params.id) } });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(category);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        const category = await categoryRepo.findOne({ where: { id: Number(req.params.id) } });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        categoryRepo.merge(category, req.body);
        const updatedCategory = await categoryRepo.save(category);
        res.json(updatedCategory);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        const result = await categoryRepo.delete(req.params.id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json({ message: "Category deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
