import { User } from '../models/User';
import { AppDataSource } from '../data-source';
import { createRouterFactory } from './routerFactory';
import { UserController } from '../controllers/UserController';
import { authenticate } from '../middleware/authMiddleware';

const userRepository = AppDataSource.getRepository(User);

const userController = new UserController(
    userRepository,
    ['id', 'name', 'email', 'recipes', 'likes', 'comments', 'subscriptions', 'subscribers']
);

const routerFactory = createRouterFactory(
    AppDataSource,
    User,
    '/users',
    ['id', 'name', 'email', 'recipes', 'likes', 'comments', 'subscriptions', 'subscribers']
);

routerFactory.setController(userController);

routerFactory.addRoutes([
    {
        path: '/email/:email',
        method: 'get',
        handler: userController.getUserByEmail
    }
]);

const userRouter = routerFactory.getRouter();

export default userRouter;
