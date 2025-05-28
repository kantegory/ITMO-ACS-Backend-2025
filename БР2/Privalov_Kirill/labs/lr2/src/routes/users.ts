import { validatorLogin } from '../middleware/validator/validatorLogin';
import { validatorRegister } from '../middleware/validator/validatorRegister';
import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { checkJwt, checkOwnership, checkRole } from '../middleware/checkJwt';
import { UserRole } from '../entities/User';
import { validatorChangePassword } from '../middleware/validator/validatorChangePassword';
import { validatorUpdateUser } from '../middleware/validator/validatorUpdateUser';

const router = Router();

router.get('/', checkJwt, checkRole(UserRole.ADMIN), UserController.getAll);
router.put(
  '/:id',
  checkJwt,
  checkOwnership('user', 'user_id'),
  validatorUpdateUser,
  UserController.update,
);
router.delete(
  '/:id',
  checkJwt,
  checkOwnership('user', 'user_id'),
  UserController.delete,
);
router.get('/:id', checkJwt, UserController.getById);
router.post(
  '/:id/change-password',
  checkJwt,
  validatorChangePassword,
  UserController.changePassword,
);
router.post('/login', validatorLogin, UserController.login);
router.post('/register', validatorRegister, UserController.register);

export default router;
