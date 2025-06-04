import { Router } from "express";
import { FreeTrainingController } from "../controllers/FreeTrainingController";

const router = Router();

router.get("/", FreeTrainingController.getAll);
router.get("/:id(\\d+)", FreeTrainingController.getById);
router.post("/", FreeTrainingController.create);
router.put("/:id(\\d+)", FreeTrainingController.update);
router.delete("/:id(\\d+)", FreeTrainingController.delete);

export default router;
