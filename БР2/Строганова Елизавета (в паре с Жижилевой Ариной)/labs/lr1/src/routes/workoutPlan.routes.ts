import { Router } from "express";
import { WorkoutPlanController } from "../controllers/workoutPlan.controller";

const router = Router();

router.post("/", WorkoutPlanController.create);       // создать план тренировок
router.get("/", WorkoutPlanController.getAll);         // получить все планы
router.get("/:id", WorkoutPlanController.getById);      // получить план по id
router.put("/:id", WorkoutPlanController.update);       // обновить план
router.delete("/:id", WorkoutPlanController.delete);    // удалить план

export default router;
