import { Router } from "express";
import {
    createRecipeDifficulty,
    getRecipeDifficulties,
    getRecipeDifficulty,
    updateRecipeDifficulty,
    deleteRecipeDifficulty
} from "../controllers/RecipeDifficultyController";

const router = Router();

router.post("/", createRecipeDifficulty);
router.get("/", getRecipeDifficulties);
router.get("/:id", getRecipeDifficulty);
router.put("/:id", updateRecipeDifficulty);
router.delete("/:id", deleteRecipeDifficulty);

export default router;
