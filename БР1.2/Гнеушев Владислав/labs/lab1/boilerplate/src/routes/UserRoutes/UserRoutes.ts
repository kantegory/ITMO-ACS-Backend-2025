import { Router, Request, Response, NextFunction } from 'express';
import { UserController } from '../../controllers/UserController';
import { HttpError } from '../../errors/HttpErrors';
import { validationMiddleware } from '../../middlewares/validationMiddleware';
import { RegisterUserDto, LoginUserDto } from './UserSchemas';

const router = Router();
const userController = new UserController();

router.post(
    '/register',
    validationMiddleware(RegisterUserDto),
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body as RegisterUserDto;

        try {
            const result = await userController.register({ email, password });
            res.status(201).json(result);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({
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
        const { email, password } = req.body as LoginUserDto;

        try {
            const result = await userController.login({ email, password });
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.statusCode).json({
                    message: error.message,
                    ...(error.details && { errors: error.details }),
                });
            } else {
                next(error);
            }
        }
    }
);

export default router; 