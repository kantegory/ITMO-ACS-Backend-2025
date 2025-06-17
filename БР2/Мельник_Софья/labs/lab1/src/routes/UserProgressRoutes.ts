import { Router } from 'express';
import { Request, Response } from 'express';
import { getUserProgresses, getUserProgressById, createUserProgress, updateUserProgress, deleteUserProgress } from '../controllers/UserProgressController';

const userProgressRouter = Router();

userProgressRouter.get('/', getUserProgresses);
userProgressRouter.get('/:id', (req, res, next) => {
  getUserProgressById(req, res).catch(next);
});
userProgressRouter.post('/', createUserProgress);
userProgressRouter.put('/:id', updateUserProgress);
userProgressRouter.delete('/:id', deleteUserProgress);

export default userProgressRouter;