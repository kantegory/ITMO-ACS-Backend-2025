import { Router } from "express";
import { createRecipe, getRecipes, getRecipe, updateRecipe, deleteRecipe } from "../controllers/RecipeController";

const router = Router();

router.post("/", createRecipe);
router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;
