import { Router } from 'express';
import { getUserByIdOrEmail, createUser, getUsers, updateUser, deleteUser } from '../controllers/UserController';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/search/email', (req, res, next) => {
  getUserByIdOrEmail(req, res).catch(next);
});
userRouter.get('/:id', (req, res, next) => {
  getUserByIdOrEmail(req, res).catch(next);
});
userRouter.post('/', createUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;