import {Router} from 'express';
import messageController from '../controllers/message.controller';

const router = Router();

router.get('/:id', messageController.getById);
router.get('/advertisement/:adId', messageController.getForAdvertisement);
router.post('/', messageController.create);
router.delete('/:id', messageController.delete);
export default router;
