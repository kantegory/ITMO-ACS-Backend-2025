import { Router } from 'express';
import {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment
} from '../controllers/commentController';

const commentRouter = Router();

commentRouter.post('/', createComment);
commentRouter.get('/', getComments);
commentRouter.get('/:id', getCommentById);
commentRouter.put('/:id', updateComment);
commentRouter.delete('/:id', deleteComment);

export default commentRouter;