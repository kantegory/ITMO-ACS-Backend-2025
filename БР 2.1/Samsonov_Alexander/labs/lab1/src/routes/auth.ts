import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../models/User';
import { UserController } from '../controllers/UserController';

const authRouter = Router();
const userRepository = AppDataSource.getRepository(User);
const userController = new UserController(
    userRepository,
    ['id', 'name', 'email']
);

authRouter.post('/register', userController.register);
authRouter.post('/login', userController.login);

export default authRouter;
