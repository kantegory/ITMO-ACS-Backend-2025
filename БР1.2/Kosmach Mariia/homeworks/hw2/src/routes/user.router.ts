import { Router } from 'express';
import userController from '../controllers/user.controller';

const router = Router();

router.get('/:id', userController.getUserById);
router.get('/email/:mail', userController.getUserByMail);

export default router;
