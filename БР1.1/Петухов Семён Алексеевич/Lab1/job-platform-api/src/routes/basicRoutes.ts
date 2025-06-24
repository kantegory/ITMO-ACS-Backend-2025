import { Router } from "express";
import {
    getAll,
    getOne,
    create,
    update,
    remove,
} from "../controllers/basicController";

const router = Router();

// 📌 Маршруты для BasicModel
router.get("/basic", getAll);           // Получить все записи
router.get("/basic/:id", getOne);       // Получить одну по ID
router.post("/basic", create);          // Создать новую запись
router.put("/basic/:id", update);       // Обновить существующую
router.delete("/basic/:id", remove);    // Удалить по ID

export default router;