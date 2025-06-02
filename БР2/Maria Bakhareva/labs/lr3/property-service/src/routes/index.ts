import { Router } from 'express';
import propertyRoutes from './properties';
import favoriteRoutes from './favorites';
import bookingRequestRoutes from './booking-requests';
import complaintRoutes from './complaints';
import propertyImageRoutes from './property-images';

const router = Router();

router.use('/properties', propertyRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/booking-requests', bookingRequestRoutes);
router.use('/complaints', complaintRoutes);
router.use('/property-images', propertyImageRoutes);

export default router;
