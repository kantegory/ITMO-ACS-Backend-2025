import { Router } from "express";
import { createRental, getAllRentals, getRentalById, updateRental, deleteRental } from "../controllers/rentalController";

const router = Router();

router.post("/", createRental);
router.get("/", getAllRentals);
router.get("/:id", getRentalById);
router.put("/:id", updateRental);
router.delete("/:id", deleteRental);

export default router;
