import { Router } from "express";
import {
    createRental,
    getAllRentals,
    getRentalById,
    getRentalsByTenant,
    getRentalsByProperty,
    deleteRental,
    updateRentalStatus,
} from "../controllers/rentalController";

const router = Router();

router.post("/", createRental);
router.get("/", getAllRentals);
router.get("/:id", getRentalById);
router.get("/tenant/:tenantId", getRentalsByTenant);
router.get("/property/:propertyId", getRentalsByProperty);
router.delete("/:id", deleteRental);
router.put("/:id/status", updateRentalStatus);

export default router;