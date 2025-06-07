import { Router } from 'express';
import { BookingController } from '../controllers/bookingController';
import { authenticate, authorizeAdmin } from '../middleware/auth';

const bookingRouter = Router();

bookingRouter.post('/', authenticate, BookingController.create);
bookingRouter.get('/', authenticate, authorizeAdmin, BookingController.getAll);
bookingRouter.get('/:id', authenticate, BookingController.getById);
bookingRouter.put('/:id', authenticate, BookingController.update);
bookingRouter.delete('/:id', authenticate, BookingController.delete);

export default bookingRouter;