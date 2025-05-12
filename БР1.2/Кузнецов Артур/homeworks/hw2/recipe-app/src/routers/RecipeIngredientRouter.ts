import { Router } from "express";
import {
    createRecipeIngredient,
    getRecipeIngredients,
    getRecipeIngredient,
    updateRecipeIngredient,
    deleteRecipeIngredient
} from "../controllers/RecipeIngredientController";

const router = Router();

router.post("/", createRecipeIngredient);
router.get("/", getRecipeIngredients);
router.get("/:id", getRecipeIngredient);
router.put("/:id", updateRecipeIngredient);
router.delete("/:id", deleteRecipeIngredient);

export default router;
