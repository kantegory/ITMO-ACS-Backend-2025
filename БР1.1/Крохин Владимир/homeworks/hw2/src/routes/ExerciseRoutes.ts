import { Router } from "express";
import { ExerciseController } from "../controllers/ExerciseController";

const router = Router();

router.get("/", ExerciseController.getAll);
router.get("/:id(\\d+)", ExerciseController.getById);
router.post("/", ExerciseController.create);
router.put("/:id(\\d+)", ExerciseController.update);
router.delete("/:id(\\d+)", ExerciseController.delete);

export default router;
