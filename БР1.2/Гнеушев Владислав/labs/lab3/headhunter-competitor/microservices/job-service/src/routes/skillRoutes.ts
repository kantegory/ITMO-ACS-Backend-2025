import { Router } from 'express';
import { SkillController } from '../controllers/SkillController';
import { validate } from 'class-validator';
import { CreateSkillDto, UpdateSkillDto } from '../dto/SkillDto';
import { HttpError } from '../errors/HttpError';

const router = Router();
const skillController = new SkillController();

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
        const skills = await skillController.getAll();
        res.json(skills);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const skill = await skillController.getById(req.params.id);
        res.json(skill);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const createDto = await validateDto(req.body, CreateSkillDto);
        const newSkill = await skillController.create(createDto);
        res.status(201).json(newSkill);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const updateDto = await validateDto(req.body, UpdateSkillDto);
        const updatedSkill = await skillController.update(req.params.id, updateDto);
        res.json(updatedSkill);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await skillController.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router; 