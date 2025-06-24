import { RequestHandler } from 'express';
import categoryService from '../services/category.service';

class CategoryController {
    getAll: RequestHandler = async (req, res, next) => {
        try {
            const categories = await categoryService.getAll();
            res.status(200).json(categories);
        } catch (err) {
            next(err);
        }
    };

    getById: RequestHandler = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const category = await categoryService.getById(id);
            res.status(200).json(category);
        } catch (err) {
            next(err);
        }
    };

    create: RequestHandler = async (req, res, next) => {
        try {
            const newCategory = await categoryService.create(req.body);
            res.status(201).json(newCategory);
        } catch (err) {
            next(err);
        }
    };

    update: RequestHandler = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const updated = await categoryService.update(id, req.body);
            res.status(200).json(updated);
        } catch (err) {
            next(err);
        }
    };

    delete: RequestHandler = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            await categoryService.delete(id);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    };
}

export default new CategoryController();
