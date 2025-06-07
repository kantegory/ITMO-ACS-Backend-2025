import { Router } from 'express';
import {
  MediaController
} from '../controllers/mediaController';
import { authenticate, authorizeAdmin } from '../middleware/auth';

const mediaRouter = Router();

mediaRouter.post('/', authenticate, authorizeAdmin, MediaController.create);
mediaRouter.get('/', MediaController.getAll);
mediaRouter.get('/:id', MediaController.getById);
mediaRouter.delete('/:id', authenticate, authorizeAdmin, MediaController.delete);

export default mediaRouter;