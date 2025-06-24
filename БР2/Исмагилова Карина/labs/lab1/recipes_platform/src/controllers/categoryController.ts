import { Request, Response } from "express";
import AppDataSource from '../app-data-source';
import { Category } from "../entities/Category";

export const categoryController = {
  async getAllCategories(req: Request, res: Response): Promise<void> {
    const categories = await AppDataSource.getRepository(Category).find({
      relations: ["recipe"],
    });
    res.json(categories);
  },

  async getCategoryById(req: Request, res: Response): Promise<void> {
    const category = await AppDataSource.getRepository(Category).findOne({
      where: { category_id: Number(req.params.id) },
      relations: ["recipe"],
    });

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.json(category);
  },

  async createCategory(req: Request, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(Category);
    const newCategory = repo.create(req.body);
    const result = await repo.save(newCategory);
    res.status(201).json(result);
  },

  async updateCategory(req: Request, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(Category);
    const category = await repo.findOneBy({ category_id: Number(req.params.id) });

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    repo.merge(category, req.body);
    const result = await repo.save(category);
    res.json(result);
  },

  async deleteCategory(req: Request, res: Response): Promise<void> {
    const result = await AppDataSource.getRepository(Category).delete({
      category_id: Number(req.params.id),
    });
    res.json(result);
  }
};
