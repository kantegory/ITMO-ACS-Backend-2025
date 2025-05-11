import { Router } from 'express';
import { PropertyController } from '../controllers/PropertyController';
import { checkJwt, checkRole } from '../middleware/checkJwt';
import { UserRole } from '../entities/User';

const router = Router();

router.get('/', checkJwt, PropertyController.getAll);
router.get('/:id', checkJwt, PropertyController.getById);
router.post(
  '/',
  checkJwt,
  checkRole(UserRole.LANDLORD),
  PropertyController.create,
);
router.put(
  '/:id',
  checkJwt,
  checkRole(UserRole.LANDLORD),
  PropertyController.update,
);
router.delete(
  '/:id',
  checkJwt,
  checkRole(UserRole.LANDLORD),
  PropertyController.delete,
);

export default router;
