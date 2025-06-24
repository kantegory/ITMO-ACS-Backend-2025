import { createUser, deleteUser, getUser, getUserMe, getUsers, updateUser } from '../controllers/userController';
import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.get('/me', authMiddleware, getUserMe);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
