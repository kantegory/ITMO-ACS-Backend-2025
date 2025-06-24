import { Router } from 'express';
import * as rentalController from '../controllers/rentalController';
import {auth} from "../middleware/auth";

const router = Router();

router.get('/', rentalController.getAllRentals);
router.get('/:id', rentalController.getRentalById);
router.post('/',auth, rentalController.createRental);
router.put('/:id', auth,rentalController.updateRental);
router.delete('/:id', auth,rentalController.deleteRental);

export default router;
