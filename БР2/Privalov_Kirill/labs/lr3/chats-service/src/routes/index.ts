import { Router } from 'express';
import chatRoutes from './chats';

const router = Router();

router.use('/chats', chatRoutes);

export default router;
