import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/verify', AuthController.verifyToken);

export default router;