import { Router } from 'express';
import * as controller from '../controllers/MessageController';

const router = Router();

router.post('/', controller.create);
router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

export default router;