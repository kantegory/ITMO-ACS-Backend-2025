import { Router } from "express";
import {
    createRecipeStep,
    getRecipeSteps,
    getRecipeStep,
    updateRecipeStep,
    deleteRecipeStep
} from "../controllers/RecipeStepController";

const router = Router();

router.post("/", createRecipeStep);
router.get("/", getRecipeSteps);
router.get("/:id", getRecipeStep);
router.put("/:id", updateRecipeStep);
router.delete("/:id", deleteRecipeStep);

export default router;
