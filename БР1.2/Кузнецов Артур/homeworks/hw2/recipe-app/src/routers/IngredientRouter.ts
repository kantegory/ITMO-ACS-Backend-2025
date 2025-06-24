import { Router } from "express";
import {
    createIngredient,
    getIngredients,
    getIngredient,
    updateIngredient,
    deleteIngredient
} from "../controllers/IngredientController";

const router = Router();

router.post("/", createIngredient);
router.get("/", getIngredients);
router.get("/:id", getIngredient);
router.put("/:id", updateIngredient);
router.delete("/:id", deleteIngredient);

export default router;
