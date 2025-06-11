import { Router, Request, Response, NextFunction } from 'express';
import { EmployerCabinetController } from '../controllers/EmployerCabinetController';
import { HttpError } from '../errors/HttpErrors';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const employerCabinetController = new EmployerCabinetController();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await employerCabinetController.getAll();
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
        const result = await employerCabinetController.getByUserId(userId);
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
        const result = await employerCabinetController.getById(id);
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
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as any).user.id;
            const result = await employerCabinetController.create(userId);
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

router.delete('/me', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        await employerCabinetController.deleteByUserId(userId);
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
        const result = await employerCabinetController.getByUserId(userId);
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