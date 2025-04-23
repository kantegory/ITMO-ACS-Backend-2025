import {User} from '../models/User';
import {AppDataSource} from '../data-source';
import {Router, Request, Response} from 'express';
import {UserController} from '../controllers/UserController';

/**
 * This file sets up the user router using Express.
 * The actual API documentation is handled by tsoa annotations in the UserController.
 */

const userRouter = Router();
const userRepository = AppDataSource.getRepository(User);

// Create the user controller with the fields to expose in the API
const userController = new UserController(
    userRepository,
    ['id', 'name', 'email', 'recipes', 'likes', 'comments', 'subscriptions', 'subscribers']
);

// Create Express-compatible wrapper methods
userRouter.get('/', async (req: Request, res: Response) => {
    try {
        const result = await userController.getAll();
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

userRouter.get('/email/:email', async (req: Request, res: Response) => {
    try {
        const result = await userController.getUserByEmail(req.params.email);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

userRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await userController.getOne(id);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

userRouter.post('/', async (req: Request, res: Response) => {
    try {
        const result = await userController.create(req.body);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

userRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await userController.update(id, req.body);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

userRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await userController.remove(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

export default userRouter;
