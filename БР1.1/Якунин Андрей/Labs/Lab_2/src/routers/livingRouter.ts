import { Router } from "express";
import LivingController from "../controllers/livingController";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/", auth, LivingController.createLiving);
router.get("/", LivingController.getAllLivings);
router.get("/:id", LivingController.getLivingById);
router.put("/:id", auth, LivingController.updateLiving);
router.delete("/:id", auth, LivingController.deleteLiving);

export default router;
