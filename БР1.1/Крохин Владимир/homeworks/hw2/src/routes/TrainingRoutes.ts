import { Router } from "express";
import { TrainingController } from "../controllers/TrainingController";

const router = Router();

router.get("/", TrainingController.getAll);
router.get("/:id(\\d+)", TrainingController.getById);
router.post("/", TrainingController.create);
router.put("/:id(\\d+)", TrainingController.update);
router.delete("/:id(\\d+)", TrainingController.delete);

export default router;
