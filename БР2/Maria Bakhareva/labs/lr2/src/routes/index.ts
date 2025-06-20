import { Router } from 'express';
import userRoutes from './userRoutes';
import propertyRoutes from './properties';
import rentalRoutes from './rentals';
import chatRoutes from './chats';
import favoriteRoutes from './favorites';
import bookingRequestRoutes from './booking-requests';
import reviewRoutes from './reviewRoutes';
import complaintRoutes from './complaints';
import propertyImageRoutes from './property-images';

const router = Router();

router.use('/users', userRoutes);
router.use('/properties', propertyRoutes);
router.use('/rentals', rentalRoutes);
router.use('/chats', chatRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/booking-requests', bookingRequestRoutes);
router.use('/reviews', reviewRoutes);
router.use('/complaints', complaintRoutes);
router.use('/property-images', propertyImageRoutes);

export default router;
