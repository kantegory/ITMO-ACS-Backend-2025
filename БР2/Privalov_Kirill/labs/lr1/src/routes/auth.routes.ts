import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { validatorRegister } from '../middleware/validator/validator.register';
import { validatorLogin } from '../middleware/validator/validator.login';

const router = Router();

router.post('/register', validatorRegister, register);
router.post('/login', validatorLogin, login);

export default router;
