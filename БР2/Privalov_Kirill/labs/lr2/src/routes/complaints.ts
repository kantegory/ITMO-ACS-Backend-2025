import { Router } from 'express';
import { ComplaintController } from '../controllers/ComplaintController';
import { checkJwt, checkOwnership, checkRole } from '../middleware/checkJwt';
import { UserRole } from '../entities/User';
import { validatorComplaint } from '../middleware/validator/validatorComplaint';

const router = Router();

router.get('/', checkJwt, ComplaintController.getAll);
router.get('/:id', checkJwt, ComplaintController.getById);
router.post(
  '/',
  checkJwt,
  validatorComplaint,
  checkRole(UserRole.TENANT),
  ComplaintController.create,
);
router.delete(
  '/:id',
  checkJwt,
  checkOwnership('complaint', 'user'),
  ComplaintController.delete,
);

export default router;
