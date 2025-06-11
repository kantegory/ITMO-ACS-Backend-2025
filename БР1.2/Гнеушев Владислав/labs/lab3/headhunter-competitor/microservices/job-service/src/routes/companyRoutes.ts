import { Router } from 'express';
import { CompanyController } from '../controllers/CompanyController';
import { validate } from 'class-validator';
import { CreateCompanyDto, UpdateCompanyDto } from '../dto/CompanyDto';
import { HttpError } from '../errors/HttpError';
import { authMiddleware } from '../middlewares/authMiddleware';

interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        email: string;
        iat: number;
        exp: number;
    };
}

const router = Router();
const companyController = new CompanyController();

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
        const companies = await companyController.getAll();
        res.json(companies);
    } catch (error) {
        next(error);
    }
});

router.get('/me', authMiddleware, async (req: any, res, next) => {
    try {
        const userId = req.user.id;
        const companies = await companyController.getByEmployerId(userId.toString());
        res.json(companies);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const company = await companyController.getById(req.params.id);
        res.json(company);
    } catch (error) {
        next(error);
    }
});

router.post('/', authMiddleware, async (req: any, res, next) => {
    try {
        const createDto = await validateDto(req.body, CreateCompanyDto);
        const userId = req.user.id; 
        const newCompany = await companyController.create(createDto, userId);
        res.status(201).json(newCompany);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const updateDto = await validateDto(req.body, UpdateCompanyDto);
        const updatedCompany = await companyController.update(req.params.id, updateDto);
        res.json(updatedCompany);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await companyController.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

router.get('/employer/:employerId', async (req, res, next) => {
    try {
        const companies = await companyController.getByEmployerId(req.params.employerId);
        res.json(companies);
    } catch (error) {
        next(error);
    }
});

export default router; 