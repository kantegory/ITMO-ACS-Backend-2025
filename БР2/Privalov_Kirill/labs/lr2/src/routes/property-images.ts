import { Router } from 'express';
import { PropertyImageController } from '../controllers/PropertyImageController';
import { checkJwt, checkRole } from '../middleware/checkJwt';

const router = Router();

router.post('/upload', checkJwt, PropertyImageController.uploadImages);
router.get('/:propertyId', checkJwt, PropertyImageController.getAll);

export default router;
