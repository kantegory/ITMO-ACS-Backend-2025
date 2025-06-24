import { Router } from "express";
import advertisementController from "../controllers/propertyController";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/",auth, advertisementController.createProperty);
router.get("/", advertisementController.getAllProperties);
router.get("/:id", advertisementController.getPropertyById);
router.put("/:id",auth, advertisementController.updateProperty);
router.delete("/:id",auth, advertisementController.deleteProperty);

export default router;
