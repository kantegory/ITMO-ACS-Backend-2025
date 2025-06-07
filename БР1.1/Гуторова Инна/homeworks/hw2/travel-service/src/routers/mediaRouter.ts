import { Router } from 'express';
import {
  createMedia,
  getMedia,
  getMediaById,
  updateMedia,
  deleteMedia
} from '../controllers/mediaController';

const mediaRouter = Router();

mediaRouter.post('/', createMedia);
mediaRouter.get('/', getMedia);
mediaRouter.get('/:id', getMediaById);
mediaRouter.put('/:id', updateMedia);
mediaRouter.delete('/:id', deleteMedia);

export default mediaRouter;