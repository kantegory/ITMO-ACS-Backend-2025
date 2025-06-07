import { Router } from 'express';
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking
} from '../controllers/bookingController';
import { authenticate } from "../middleware/auth";
import { authorizeAdmin } from "../middleware/authAdm";

const bookingRouter = Router();

bookingRouter.post('/', createBooking);
bookingRouter.get('/', getBookings);
bookingRouter.get('/:id', getBookingById);
bookingRouter.put('/:id', updateBooking);
bookingRouter.delete('/:id', deleteBooking);

export default bookingRouter;