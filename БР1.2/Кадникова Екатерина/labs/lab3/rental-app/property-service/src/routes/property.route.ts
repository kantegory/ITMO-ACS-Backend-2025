import { Router } from "express";
import PropertyController from "../controllers/property.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", PropertyController.getAllProperties);
router.get("/search", PropertyController.searchProperties);
router.get("/:id", PropertyController.getPropertyById);
router.post("/", authenticate, PropertyController.createProperty);
router.put("/:id", authenticate, PropertyController.updateProperty);
router.delete("/:id", authenticate, PropertyController.deleteProperty);

export default router;