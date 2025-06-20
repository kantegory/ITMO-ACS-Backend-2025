import { Router } from "express";
import * as RecipeIngredientController from "../controllers/recipeIngredient.controller";

const router = Router();

router.post("/", RecipeIngredientController.createRecipeIngredient);
router.put("/", RecipeIngredientController.updateRecipeIngredient);
router.delete("/", RecipeIngredientController.deleteRecipeIngredient);

export default router;
