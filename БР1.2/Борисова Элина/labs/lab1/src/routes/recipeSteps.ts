import { Router } from "express";
import * as RecipeStepController from "../controllers/recipeSteps.controller";

const router = Router();

router.post("/", RecipeStepController.createRecipeStep);
router.get("/recipe/:recipeId", RecipeStepController.getStepsByRecipe);
router.put("/:id", RecipeStepController.updateRecipeStep);
router.delete("/:id", RecipeStepController.deleteRecipeStep);

export default router;
