import { Router } from "express";
import { TrainingNoteController } from "../controllers/TrainingNoteController";

const router = Router();

router.get("/", TrainingNoteController.getAll);
router.get("/:id(\\d+)", TrainingNoteController.getById);
router.post("/", TrainingNoteController.create);
router.delete("/:id(\\d+)", TrainingNoteController.delete);

export default router;
