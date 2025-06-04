import { Router } from "express";
import { NoteController } from "../controllers/NoteController";

const router = Router();

router.get("/", NoteController.getAll);
router.get("/:id(\\d+)", NoteController.getById);
router.post("/", NoteController.create);
router.put("/:id(\\d+)", NoteController.update);
router.delete("/:id(\\d+)", NoteController.delete);

export default router;
