import { Router } from "express";
import { propertyController } from "../controllers/propertyController";

const router = Router();

router.get("/", propertyController.getAll);
router.get("/:id", propertyController.getById);
router.post("/", propertyController.create);
router.put("/:id", propertyController.update);
router.delete("/:id", propertyController.delete);

export default router;
