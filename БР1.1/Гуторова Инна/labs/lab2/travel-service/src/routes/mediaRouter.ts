import { Router } from 'express';
import {
  createMedia,
  getMedia,
  getMediaById,
  updateMedia,
  deleteMedia
} from '../controllers/mediaController';
import { authenticate } from "../middleware/auth";
import { authorizeAdmin } from "../middleware/authAdm";

const mediaRouter = Router();

mediaRouter.post('/', authenticate, authorizeAdmin, createMedia);
mediaRouter.get('/', getMedia);
mediaRouter.get('/:id', getMediaById);
mediaRouter.put('/:id', authenticate, authorizeAdmin, updateMedia);
mediaRouter.delete('/:id', authenticate, authorizeAdmin, deleteMedia);

export default mediaRouter;