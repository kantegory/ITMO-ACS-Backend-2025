import { Router } from "express";
import {
    createDishType,
    getDishTypes,
    getDishType,
    updateDishType,
    deleteDishType
} from "../controllers/DishTypeController";

const router = Router();

router.post("/", createDishType);
router.get("/", getDishTypes);
router.get("/:id", getDishType);
router.put("/:id", updateDishType);
router.delete("/:id", deleteDishType);

export default router;
