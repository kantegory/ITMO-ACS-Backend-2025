import { Request, Response } from 'express';
import { AppDataSource } from '../config/app-data-source';
import { Category } from '../entities/Category';

const categoryRepository = AppDataSource.getRepository(Category);

export const getCategories = async (req: Request, res: Response) => {
  const categories = await categoryRepository.find();
  res.json(categories);
};

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await categoryRepository.findOneBy({ id: Number(id) });

  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }

  res.json(category);
};

export const createCategory = async (req: Request, res: Response) => {
  const newCategory = categoryRepository.create(req.body);
  const result = await categoryRepository.save(newCategory);
  res.status(201).json(result);
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  await categoryRepository.update(id, req.body);
  res.json({ message: 'Category updated' });
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  await categoryRepository.delete(id);
  res.json({ message: 'Category deleted' });
};