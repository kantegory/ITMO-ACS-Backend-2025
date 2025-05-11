import { Router } from "express";
import { rentalController } from "../controllers/rentalController";

const router = Router();

router.get("/", rentalController.getAll);
router.get("/:id", rentalController.getById);
router.post("/", rentalController.create);
router.put("/:id", rentalController.update);
router.delete("/:id", rentalController.delete);

export default router;
