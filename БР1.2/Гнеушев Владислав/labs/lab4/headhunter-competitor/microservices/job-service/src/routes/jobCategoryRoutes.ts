import { Router } from 'express';
import { JobCategoryController } from '../controllers/JobCategoryController';
import { validate } from 'class-validator';
import { CreateJobCategoryDto, UpdateJobCategoryDto } from '../dto/JobCategoryDto';
import { HttpError } from '../errors/HttpError';

const router = Router();
const jobCategoryController = new JobCategoryController();

const validateDto = async (dto: any, DtoClass: any) => {
    const instance = Object.assign(new DtoClass(), dto);
    const errors = await validate(instance);
    if (errors.length > 0) {
        const errorMessages = errors.map(error => 
            Object.values(error.constraints || {}).join(', ')
        ).join('; ');
        throw new HttpError(400, `Validation failed: ${errorMessages}`);
    }
    return instance;
};

router.get('/', async (req, res, next) => {
    try {
        const categories = await jobCategoryController.getAll();
        res.json(categories);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const category = await jobCategoryController.getById(req.params.id);
        res.json(category);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const createDto = await validateDto(req.body, CreateJobCategoryDto);
        const newCategory = await jobCategoryController.create(createDto);
        res.status(201).json(newCategory);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const updateDto = await validateDto(req.body, UpdateJobCategoryDto);
        const updatedCategory = await jobCategoryController.update(req.params.id, updateDto);
        res.json(updatedCategory);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await jobCategoryController.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router; 