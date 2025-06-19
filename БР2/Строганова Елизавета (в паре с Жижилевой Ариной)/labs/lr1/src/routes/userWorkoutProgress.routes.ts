import { Router } from "express";
import { UserWorkoutProgressController } from "../controllers/userWorkoutProgress.controller";

const router = Router();

router.post("/", UserWorkoutProgressController.create);   // создать прогресс тренировки
router.get("/", UserWorkoutProgressController.getAll);     // получить весь прогресс
router.get("/:id", UserWorkoutProgressController.getById);  // получить прогресс по id
router.put("/:id", UserWorkoutProgressController.update);   // обновить прогресс
router.delete("/:id", UserWorkoutProgressController.delete); // удалить прогресс

export default router;
