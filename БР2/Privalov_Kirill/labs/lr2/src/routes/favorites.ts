import { Router } from 'express';
import { FavoriteController } from '../controllers/FavoriteController';
import { checkJwt, checkOwnership, checkRole } from '../middleware/checkJwt';
import { UserRole } from '../entities/User';
const router = Router();

router.get(
  '/:id',
  checkJwt,
  checkRole(UserRole.TENANT),
  checkOwnership('favorite', 'user'),
  FavoriteController.getById,
);
router.get(
  '/',
  checkJwt,
  checkRole(UserRole.TENANT),
  FavoriteController.getAll,
);
router.post(
  '/',
  checkJwt,
  checkRole(UserRole.TENANT),
  checkOwnership('favorite', 'user'),
  FavoriteController.create,
);
router.put(
  '/:id',
  checkJwt,
  checkRole(UserRole.TENANT),
  checkOwnership('favorite', 'user'),
  FavoriteController.update,
);
router.delete(
  '/:id',
  checkJwt,
  checkRole(UserRole.TENANT),
  checkOwnership('favorite', 'user'),
  FavoriteController.delete,
);

export default router;
