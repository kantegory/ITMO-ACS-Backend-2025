import { Router, Request, Response, RequestHandler } from 'express';
import { CurrentProgressController } from '../controllers/current-progress.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const currentProgressController = new CurrentProgressController();

router.get('/my-progress', authMiddleware, currentProgressController.getMyCurrentProgress as RequestHandler);
router.get('/', authMiddleware, currentProgressController.getAllCurrentProgress);
router.get('/:id', authMiddleware, currentProgressController.getCurrentProgressById);
router.get('/user/:userId', authMiddleware, currentProgressController.getCurrentProgressByUserId);
router.post('/', authMiddleware, currentProgressController.createCurrentProgress);
router.put('/user/:userId', authMiddleware, currentProgressController.updateCurrentProgress);
router.delete('/user/:userId', authMiddleware, currentProgressController.deleteCurrentProgress);

export default router;