import { Router, Request, Response, NextFunction } from 'express';
import { UserController } from '../../controllers/UserController';
import { HttpError } from '../../errors/HttpErrors';
import { validationMiddleware } from '../../middlewares/validationMiddleware';
import { RegisterUserDto, LoginUserDto } from './UserDtos';

const router = Router();
const userController = new UserController();

/**
 * @openapi
 * /api/users/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUserDto'
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterSuccessResponse'
 *       400:
 *         description: Invalid input (e.g., validation error, missing fields).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Conflict - Email already in use.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
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
                    message: error.message,
                    ...(error.details && { errors: error.details }),
                });
            } else {
                next(error);
            }
        }
    }
);

/**
 * @openapi
 * /api/users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Log in an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUserDto'
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginSuccessResponse'
 *       400:
 *         description: Invalid input (e.g., validation error, missing fields).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid email or password.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
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