import { Router } from "express";
import {
    getAllRentals,
    getRentalById,
    getUserRentals,
    createRental,
    updateRental,
    updateRentalStatus,
    deleteRental,
} from "../controllers/rentalController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/my-rentals", authenticateToken, getUserRentals);
router.get('/', getAllRentals);
router.get('/:id', getRentalById);
router.post("/", authenticateToken, createRental);
router.put('/:id', authenticateToken, updateRental);
router.put("/:id/status", authenticateToken, updateRentalStatus);
router.delete('/:id', authenticateToken, deleteRental);

export default router;