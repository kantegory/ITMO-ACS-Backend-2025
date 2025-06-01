import { Router } from "express";
import RentalController from "../controllers/rental.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/my-rentals", authenticate, RentalController.getUserRentals);
router.get('/', RentalController.getAllRentals);
router.get('/:id', authenticate, RentalController.getRentalById);
router.post("/", authenticate, RentalController.createRental);
router.put('/:id', authenticate, RentalController.updateRental);
router.put("/:id/status", authenticate, RentalController.updateRentalStatus);
router.delete('/:id', authenticate, RentalController.deleteRental);

export default router;