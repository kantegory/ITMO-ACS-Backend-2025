import { Router } from "express";
import ComfortController from "../controllers/ComfortController";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/", auth, ComfortController.createComfort);
router.get("/", ComfortController.getAllComforts);
router.get("/:id", ComfortController.getComfortById);
router.put("/:id", auth, ComfortController.updateComfort);
router.delete("/:id", auth, ComfortController.deleteComfort);

export default router;
