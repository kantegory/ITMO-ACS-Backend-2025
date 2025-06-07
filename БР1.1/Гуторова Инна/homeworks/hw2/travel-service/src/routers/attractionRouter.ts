import { Router } from 'express';
import {
  createAttraction,
  getAttractions,
  getAttractionById,
  updateAttraction,
  deleteAttraction
} from '../controllers/attractionController';

const attractionRouter = Router();

attractionRouter.post('/', createAttraction);
attractionRouter.get('/', getAttractions);
attractionRouter.get('/:id', getAttractionById);
attractionRouter.put('/:id', updateAttraction);
attractionRouter.delete('/:id', deleteAttraction);

export default attractionRouter;