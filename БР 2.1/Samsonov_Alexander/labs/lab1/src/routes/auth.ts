import {Router, Request, Response} from 'express';
import {AppDataSource} from '../data-source';
import {User} from '../models/User';
import {UserController} from '../controllers/UserController';

const authRouter = Router();
const userRepository = AppDataSource.getRepository(User);
const userController = new UserController(
    userRepository,
    ['id', 'name', 'email']
);

// Create Express-compatible wrapper methods
authRouter.post('/register', async (req: Request, res: Response) => {
    try {
        const result = await userController.register(req.body);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

authRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const result = await userController.login(req.body);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
});

export default authRouter;
