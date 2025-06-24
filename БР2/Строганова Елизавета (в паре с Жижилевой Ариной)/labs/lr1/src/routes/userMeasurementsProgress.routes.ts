import { Router } from "express";
import { UserMeasurementsProgressController } from "../controllers/userMeasurementsProgress.controller";

const router = Router();

router.post("/", UserMeasurementsProgressController.create); // создать прогресс измерений
router.get("/", UserMeasurementsProgressController.getAll);   // получить все измерения
router.get("/:id", UserMeasurementsProgressController.getById); // получить измерение по id
router.put("/:id", UserMeasurementsProgressController.update);  // обновить измерение
router.delete("/:id", UserMeasurementsProgressController.delete); // удалить измерение

export default router;
