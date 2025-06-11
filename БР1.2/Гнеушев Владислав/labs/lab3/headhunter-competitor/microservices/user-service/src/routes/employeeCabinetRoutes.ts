import { Router, Request, Response, NextFunction } from 'express';
import { EmployeeCabinetController } from '../controllers/EmployeeCabinetController';
import { HttpError } from '../errors/HttpErrors';
import { validationMiddleware } from '../middlewares/validationMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';
import { CreateEmployeeCabinetDto, UpdateEmployeeCabinetDto } from './UserDtos';

const router = Router();
const employeeCabinetController = new EmployeeCabinetController();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await employeeCabinetController.getAll();
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                ...(error.details && { errors: error.details }),
            });
        } else {
            next(error);
        }
    }
});

router.get('/me', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const result = await employeeCabinetController.getByUserId(userId);
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                ...(error.details && { errors: error.details }),
            });
        } else {
            next(error);
        }
    }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({
                success: false,
                message: 'Invalid cabinet ID format'
            });
            return;
        }
        const result = await employeeCabinetController.getById(id);
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                ...(error.details && { errors: error.details }),
            });
        } else {
            next(error);
        }
    }
});

router.post(
    '/',
    authMiddleware,
    validationMiddleware(CreateEmployeeCabinetDto),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as any).user.id;
            const createDto = req.body as CreateEmployeeCabinetDto;
            const result = await employeeCabinetController.create(createDto, userId);
            res.status(201).json(result);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                    ...(error.details && { errors: error.details }),
                });
            } else {
                next(error);
            }
        }
    }
);

router.put(
    '/me',
    authMiddleware,
    validationMiddleware(UpdateEmployeeCabinetDto, true),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as any).user.id;
            const updateDto = req.body as UpdateEmployeeCabinetDto;
            const result = await employeeCabinetController.updateByUserId(userId, updateDto);
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                    ...(error.details && { errors: error.details }),
                });
            } else {
                next(error);
            }
        }
    }
);

router.delete('/me', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        await employeeCabinetController.deleteByUserId(userId);
        res.status(204).send();
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                ...(error.details && { errors: error.details }),
            });
        } else {
            next(error);
        }
    }
});

router.get('/by-user/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            res.status(400).json({
                success: false,
                message: 'Invalid user ID format'
            });
            return;
        }
        const result = await employeeCabinetController.getByUserId(userId);
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
                ...(error.details && { errors: error.details }),
            });
        } else {
            next(error);
        }
    }
});

export default router; 