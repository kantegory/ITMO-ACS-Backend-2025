import { Router } from 'express';
import { BookingController  } from '../controllers/booking.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, BookingController.create);
router.get('/', authMiddleware, BookingController.findAll);
router.get('/:id', authMiddleware, BookingController.findOne);
router.put('/:id', authMiddleware, BookingController.update);
router.delete('/:id', authMiddleware, BookingController.remove);

export default router;