import { Router } from "express";
import { SeriesNoteController } from "../controllers/SeriesNoteController";

const router = Router();

router.get("/", SeriesNoteController.getAll);
router.get("/:id(\\d+)", SeriesNoteController.getById);
router.post("/", SeriesNoteController.create);
router.delete("/:id(\\d+)", SeriesNoteController.delete);

export default router;
