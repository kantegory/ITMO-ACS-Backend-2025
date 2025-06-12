import { Router } from 'express';
import { HostelController } from '../controllers/hostelController';
import { RoomController } from '../controllers/roomController';
import { CheckInOutController } from '../controllers/CheckInOutController';
import { PaymentController } from '../controllers/paymentController';
import { ResidentController } from '../controllers/ResidentController';
import { JwtAuthMiddleware } from '../middlewares/jwt-auth.middleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const router = Router();
const hostelController = new HostelController();
const roomController = new RoomController();
const checkInOutController = new CheckInOutController();
const paymentController = new PaymentController();
const residentController = new ResidentController();

router.post('/hostels', JwtAuthMiddleware, roleMiddleware(['admin']), hostelController.createHostel);
router.get('/hostels', JwtAuthMiddleware, hostelController.getHostels);
router.get('/hostels/:id', JwtAuthMiddleware, hostelController.getHostelById);
router.patch('/hostels/:id', JwtAuthMiddleware, hostelController.updateHostel);
router.delete('/hostels/:id', JwtAuthMiddleware, roleMiddleware(['admin']), hostelController.deleteHostel);

router.post('/rooms', JwtAuthMiddleware, roleMiddleware(['admin', 'manager']), roomController.createRoom);
router.get('/rooms', JwtAuthMiddleware, roomController.getRooms);
router.get('/rooms/:id', JwtAuthMiddleware, roomController.getRoomById);
router.patch('/rooms/:id', JwtAuthMiddleware, roleMiddleware(['admin', 'manager']), roomController.updateRoom);
router.delete('/rooms/:id', JwtAuthMiddleware, roleMiddleware(['admin']), roomController.deleteRoom);

router.post('/checkins', JwtAuthMiddleware, roleMiddleware(['admin', 'manager']), checkInOutController.createCheckInOut);
router.get('/checkins', JwtAuthMiddleware, checkInOutController.getCheckIns);
router.get('/checkins/:id', JwtAuthMiddleware, checkInOutController.getCheckInById);
router.patch('/checkins/:id', JwtAuthMiddleware, roleMiddleware(['admin', 'manager']), checkInOutController.updateCheckInOut);
router.delete('/checkins/:id', JwtAuthMiddleware, roleMiddleware(['admin']), checkInOutController.deleteCheckInOut);

router.post('/payments', JwtAuthMiddleware, roleMiddleware(['admin', 'manager']), paymentController.createPayment);
router.get('/payments', JwtAuthMiddleware, paymentController.getPayments);
router.get('/payments/:id', JwtAuthMiddleware, paymentController.getPaymentById);
router.patch('/payments/:id', JwtAuthMiddleware, roleMiddleware(['admin', 'manager']), paymentController.updatePayment);
router.delete('/payments/:id', JwtAuthMiddleware, roleMiddleware(['admin']), paymentController.deletePayment);

router.get('/residents', JwtAuthMiddleware, roleMiddleware(['admin']), residentController.getResidents);
router.get('/residents/:id', JwtAuthMiddleware, roleMiddleware(['admin']), residentController.getResidentById);

export default router;