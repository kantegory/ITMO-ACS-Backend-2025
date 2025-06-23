import { Router } from 'express';
import { 
  getBuildings, 
  getBuildingById, 
  createBuilding,
  getApartments,
  getApartmentById,
  createApartment
} from '../controllers/propertyController';

const router = Router();

// Building routes
router.get('/buildings', getBuildings);
router.get('/buildings/:id', getBuildingById);
router.post('/buildings', createBuilding);

// Apartment routes
router.get('/apartments', getApartments);
router.get('/apartments/:id', getApartmentById);
router.post('/apartments', createApartment);

export default router; 