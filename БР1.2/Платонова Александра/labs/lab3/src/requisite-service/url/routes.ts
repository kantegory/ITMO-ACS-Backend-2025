import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { RoleController } from '../controllers/roleController';
import { AccessController } from '../controllers/accessController';
import { JwtAuthMiddleware } from '../middlewares/jwt-auth.middleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const router = Router();
const authController = new AuthController();
const roleController = new RoleController();
const accessController = new AccessController();

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

router.post('/roles', JwtAuthMiddleware, roleMiddleware(['admin']), roleController.createRole);

router.post('/access/assign', JwtAuthMiddleware, roleMiddleware(['admin']), accessController.assignAccess);
router.get('/access', JwtAuthMiddleware, accessController.getUserAccessRules);
router.delete('/access/:id', JwtAuthMiddleware, roleMiddleware(['admin']), accessController.revokeAccess);

export default router;