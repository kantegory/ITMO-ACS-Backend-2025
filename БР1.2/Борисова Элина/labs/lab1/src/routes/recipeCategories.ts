import { Router } from "express";
import * as RecipeCategoryController from "../controllers/recipeCategories.controller";

const router = Router();

router.post("/", RecipeCategoryController.createRecipeCategory);
router.delete("/", RecipeCategoryController.deleteRecipeCategory);

export default router;
