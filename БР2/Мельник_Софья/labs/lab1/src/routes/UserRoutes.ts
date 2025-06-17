import { Router } from 'express';
import { getUserByIdOrEmail, createUser, getUsers, updateUser, deleteUser, loginUser } from '../controllers/UserController';
import { authMiddleware } from '../middleware/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler';

const userRouter = Router();

userRouter.get('/', asyncHandler(getUsers));
userRouter.get('/search/email', authMiddleware, asyncHandler(getUserByIdOrEmail));
userRouter.get('/:id', authMiddleware, asyncHandler(getUserByIdOrEmail));
userRouter.put('/:id', authMiddleware, asyncHandler(updateUser));
userRouter.delete('/:id', authMiddleware, asyncHandler(deleteUser));
userRouter.post('/', asyncHandler(createUser));
userRouter.post('/login', asyncHandler(loginUser));

export default userRouter;
