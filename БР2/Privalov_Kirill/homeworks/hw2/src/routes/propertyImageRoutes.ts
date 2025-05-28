import { Router } from "express";
import { propertyImageController } from "../controllers/propertyImageController";

const router = Router();

router.get("/", propertyImageController.getAll);
router.get("/:id", propertyImageController.getById);
router.post("/", propertyImageController.create);
router.put("/:id", propertyImageController.update);
router.delete("/:id", propertyImageController.delete);

export default router;
