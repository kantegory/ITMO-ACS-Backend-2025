import { Router } from 'express';
import { ReviewController } from '../controllers/ReviewController';
import { checkJwt, checkOwnership } from '../middleware/checkJwt';

const router = Router();

router.get('/', checkJwt, ReviewController.getAll);
router.get('/:id', checkJwt, ReviewController.getById);
router.post('/', checkJwt, ReviewController.create);
router.put(
  '/:id',
  checkJwt,
  checkOwnership('review', 'author_id'),
  ReviewController.update,
);
router.delete(
  '/:id',
  checkJwt,
  checkOwnership('review', 'author_id'),
  ReviewController.delete,
);

export default router;
