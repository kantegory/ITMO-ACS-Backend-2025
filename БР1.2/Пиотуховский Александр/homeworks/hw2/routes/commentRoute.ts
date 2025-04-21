import { Router } from 'express';
import * as commentController from '../controllers/commentController';

const router = Router();

// /comments?commentableType=post&commentableId=1
router.get('/', commentController.listCommentsController);
router.get('/:id', commentController.getCommentController);
router.post('/', commentController.createCommentController);
router.put('/:id', commentController.updateCommentController);
router.delete('/:id', commentController.deleteCommentController);

export default router;