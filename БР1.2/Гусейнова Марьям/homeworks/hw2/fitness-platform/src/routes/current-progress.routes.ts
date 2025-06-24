import express from 'express';
import { CurrentProgressController } from '../controllers/current-progress.controller';

const router = express.Router();
const currentProgressController = new CurrentProgressController();

router.get('/', currentProgressController.getAllCurrentProgress);
router.get('/:id', currentProgressController.getCurrentProgressById);
router.get('/user/:userId', currentProgressController.getCurrentProgressByUserId);
router.post('/', currentProgressController.createCurrentProgress);
router.put('/user/:userId', currentProgressController.updateCurrentProgress);
router.delete('/user/:userId', currentProgressController.deleteCurrentProgress);

export default router;