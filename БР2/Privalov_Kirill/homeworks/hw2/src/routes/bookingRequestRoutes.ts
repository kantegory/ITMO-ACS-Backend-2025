import { Router } from "express";
import { bookingRequestController } from "../controllers/bookingRequestController";

const router = Router();

router.get("/", bookingRequestController.getAll);
router.get("/:id", bookingRequestController.getById);
router.post("/", bookingRequestController.create);
router.put("/:id", bookingRequestController.update);
router.delete("/:id", bookingRequestController.delete);

export default router;
