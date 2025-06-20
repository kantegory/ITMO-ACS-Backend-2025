import { Router } from 'express';
import {
  createAttraction,
  getAttractions,
  getAttractionById,
  updateAttraction,
  deleteAttraction
} from '../controllers/attractionController';
import { authenticate } from "../middleware/auth";
import { authorizeAdmin } from "../middleware/authAdm";

const attractionRouter = Router();

attractionRouter.post('/', authenticate, authorizeAdmin, createAttraction);
attractionRouter.get('/', getAttractions);
attractionRouter.get('/:id', getAttractionById);
attractionRouter.put('/:id', authenticate, authorizeAdmin, updateAttraction);
attractionRouter.delete('/:id', authenticate, authorizeAdmin, deleteAttraction);

export default attractionRouter;