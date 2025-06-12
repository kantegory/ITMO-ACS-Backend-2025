import { Router } from 'express';
import adminRoutes from './admin-service/url/routes';
import residentRoutes from './resident-service/url/routes';
import requisiteRoutes from './requisite-service/url/routes';

const router = Router();

router.use('/api/admin', adminRoutes);
router.use('/api/resident', residentRoutes);
router.use('/api/auth', requisiteRoutes);

router.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

export default router;