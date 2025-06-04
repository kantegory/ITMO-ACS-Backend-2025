import { Router } from "express";
import { QualificationTrainingController } from "../controllers/QualificationTrainingController";

const router = Router();

router.get("/", QualificationTrainingController.getAll);
router.get("/:id(\\d+)", QualificationTrainingController.getById);
router.post("/", QualificationTrainingController.create);
router.put("/:id(\\d+)", QualificationTrainingController.update);
router.delete("/:id(\\d+)", QualificationTrainingController.delete);

export default router;
