import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import { UserController } from '../controllers/UserController';
import { HttpError } from '../errors/HttpErrors';
import { HttpValidationError, validationMiddleware } from '../middlewares/validationMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';
import { RegisterUserDto, LoginUserDto, UpdateUserDto } from './UserDtos';

const router = Router();
const userController = new UserController();

router.post(
    '/register',
    validationMiddleware(RegisterUserDto),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await userController.register(req.body as RegisterUserDto);
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

router.post(
    '/login',
    validationMiddleware(LoginUserDto),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await userController.login(req.body as LoginUserDto);
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

router.get(
    '/profile',
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as any).user.id;
            const result = await userController.getProfile(userId);
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

router.put(
    '/profile',
    authMiddleware,
    validationMiddleware(UpdateUserDto, true),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as any).user.id;
            const updateData = req.body as UpdateUserDto;
            const result = await userController.updateProfile(userId, updateData);
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

const getUserByIdHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            res.status(400).json({
                success: false,
                message: 'Invalid user ID format'
            });
            return;
        }
        const result = await userController.getUserById(userId);
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
};

router.get('/:id', getUserByIdHandler);

export default router; 