import { Router } from "express";
import { WorkoutController } from "../controllers/workout.controller";

const router = Router();

router.post("/", WorkoutController.create);           // создать тренировку
router.get("/", WorkoutController.getAll);             // получить все тренировки
router.get("/:id", WorkoutController.getById);          // получить тренировку по id
router.put("/:id", WorkoutController.update);           // обновить тренировку
router.delete("/:id", WorkoutController.delete);        // удалить тренировку

export default router;
