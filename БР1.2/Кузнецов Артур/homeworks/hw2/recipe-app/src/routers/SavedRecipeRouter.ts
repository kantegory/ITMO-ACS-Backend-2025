import { Router } from "express";
import {
    createSavedRecipe,
    getSavedRecipes,
    getSavedRecipe,
    updateSavedRecipe,
    deleteSavedRecipe
} from "../controllers/SavedRecipeController";

const router = Router();

router.post("/", createSavedRecipe);
router.get("/", getSavedRecipes);
router.get("/:id", getSavedRecipe);
router.put("/:id", updateSavedRecipe);
router.delete("/:id", deleteSavedRecipe);

export default router;
