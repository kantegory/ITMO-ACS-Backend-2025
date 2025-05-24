import { Router } from "express";
import {createUser, getUsers, getUser, getUserMe, updateUser, deleteUser } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', createUser)
router.get('/', getUsers);
router.get('/me', authMiddleware, getUserMe);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;