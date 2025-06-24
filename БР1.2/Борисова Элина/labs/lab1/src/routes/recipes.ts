import { Router } from "express";
import * as RecipeController from "../controllers/recipes.controller";

const router = Router();

router.post("/", RecipeController.createRecipe);
router.get("/", RecipeController.getAllRecipes);
router.get("/:id", RecipeController.getRecipeById);
router.put("/:id", RecipeController.updateRecipe);
router.delete("/:id", RecipeController.deleteRecipe);

export default router;
