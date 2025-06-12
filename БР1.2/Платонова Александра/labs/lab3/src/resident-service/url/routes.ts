import { Router } from 'express';
import { ProfileController } from '../controllers/profileController';
import { CheckInOutController } from '../controllers/checkInOutController';
import { PaymentController } from '../controllers/paymentController';
import { JwtAuthMiddleware } from '../middlewares/jwt-auth.middleware';

const router = Router();
const profileController = new ProfileController();
const checkInOutController = new CheckInOutController();
const paymentController = new PaymentController();

router.get('/profile', JwtAuthMiddleware, profileController.getProfile);
router.patch('/profile', JwtAuthMiddleware, profileController.updateProfile);

router.get('/checkins', JwtAuthMiddleware, checkInOutController.getMyCheckIns);

router.get('/payments', JwtAuthMiddleware, paymentController.getMyPayments);
router.post('/payments', JwtAuthMiddleware, paymentController.createPayment);

export default router;