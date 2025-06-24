import { Router } from "express";
import {
    getAllRecipeCategories,
    createRecipeCategory,
    deleteRecipeCategory
} from "../controllers/recipeCategories.controller";

const router = Router();

router.get("/", getAllRecipeCategories);
router.post("/", createRecipeCategory);
router.delete("/:recipe_id/:category_id", deleteRecipeCategory);

export default router;
