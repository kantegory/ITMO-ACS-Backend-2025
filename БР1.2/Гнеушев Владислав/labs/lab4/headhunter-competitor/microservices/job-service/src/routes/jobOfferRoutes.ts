import { Router } from 'express';
import { JobOfferController } from '../controllers/JobOfferController';
import { validate } from 'class-validator';
import { CreateJobOfferDto, UpdateJobOfferDto } from '../dto/JobOfferDto';
import { HttpError } from '../errors/HttpError';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const jobOfferController = new JobOfferController();

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
        const jobOffers = await jobOfferController.getAll();
        res.json(jobOffers);
    } catch (error) {
        next(error);
    }
});

router.get('/me', authMiddleware, async (req: any, res, next) => {
    try {
        const userId = req.user.id;
        const jobOffers = await jobOfferController.getByUserId(userId.toString());
        res.json(jobOffers);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const jobOffer = await jobOfferController.getById(req.params.id);
        res.json(jobOffer);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const createDto = await validateDto(req.body, CreateJobOfferDto);
        const newJobOffer = await jobOfferController.create(createDto);
        res.status(201).json(newJobOffer);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const updateDto = await validateDto(req.body, UpdateJobOfferDto);
        const updatedJobOffer = await jobOfferController.update(req.params.id, updateDto);
        res.json(updatedJobOffer);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await jobOfferController.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

router.get('/company/:companyId', async (req, res, next) => {
    try {
        const jobOffers = await jobOfferController.getByCompanyId(req.params.companyId);
        res.json(jobOffers);
    } catch (error) {
        next(error);
    }
});

router.get('/category/:categoryId', async (req, res, next) => {
    try {
        const jobOffers = await jobOfferController.getByCategoryId(req.params.categoryId);
        res.json(jobOffers);
    } catch (error) {
        next(error);
    }
});

export default router; 