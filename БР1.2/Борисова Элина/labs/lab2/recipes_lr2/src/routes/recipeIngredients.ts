import { Router } from "express";
import {
    getAllRecipeIngredients,
    createRecipeIngredient,
    updateRecipeIngredient,
    deleteRecipeIngredient
} from "../controllers/recipeIngredient.controller";

const router = Router();

router.get("/", getAllRecipeIngredients);
router.post("/", createRecipeIngredient);
router.put("/:recipe_id/:ingredient_id", updateRecipeIngredient);
router.delete("/:recipe_id/:ingredient_id", deleteRecipeIngredient);

export default router;
