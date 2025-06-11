import { Request, Response } from "express";
import categoryService from "../services/categoryService";

export const createCategory = async (req: Request, res: Response) => {
    try {
        const categoryData = req.body;
        categoryData.ownerId = (req as any).user.id;

        const savedCategory = await categoryService.createCategory(categoryData);
        res.status(201).json(savedCategory);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const getCategoryById = async (req: Request, res: Response): Promise<any> => {
    try {
        const category = await categoryService.getCategoryById(Number(req.params.id));
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
        const updatedCategory = await categoryService.updateCategory(
            Number(req.params.id),
            req.body
        );
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(updatedCategory);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        const result = await categoryService.deleteCategory(Number(req.params.id));
        if (!result) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json({ message: "Category deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
