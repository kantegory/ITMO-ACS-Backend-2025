import { Router } from 'express';
import {
  deleteUser,
  editUser,
  getAllUsers,
  getUserById,
} from '../controllers/user.controller';
import { checkJwt, checkRole } from '../middleware/checkJwt';

const router = Router();

router.get('/', checkJwt, getAllUsers);
router.get('/:id', checkJwt, getUserById);
router.put('/:id', checkJwt, checkRole('admin'), editUser);
router.delete('/:id', checkJwt, checkRole('admin'), deleteUser);

export default router;
