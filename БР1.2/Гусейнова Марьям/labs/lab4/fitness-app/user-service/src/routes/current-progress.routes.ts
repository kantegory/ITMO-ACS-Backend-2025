import { Router } from 'express';
import { CurrentProgressController } from '../controllers/current-progress.controller';
import { authMiddleware } from "../middlewares/auth.middleware";
import { asyncHandler } from '../utils/async-handler'; 

const router = Router();
const currentProgressController = new CurrentProgressController();

router.get('/my-progress', authMiddleware, asyncHandler(currentProgressController.getMyCurrentProgress));
router.get('/', authMiddleware, asyncHandler(currentProgressController.getAllCurrentProgress));
router.get('/:id', authMiddleware, asyncHandler(currentProgressController.getCurrentProgressById));
router.get('/user/:userId', authMiddleware, asyncHandler(currentProgressController.getCurrentProgressByUserId));
router.post('/', authMiddleware, asyncHandler(currentProgressController.createCurrentProgress));
router.put('/user/:userId', authMiddleware, asyncHandler(currentProgressController.updateCurrentProgress));
router.delete('/user/:userId', authMiddleware, asyncHandler(currentProgressController.deleteCurrentProgress));

export default router;