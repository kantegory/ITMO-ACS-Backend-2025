import { Router } from "express";
import {
    createProgress,
    getAllProgress,
    getProgressById,
    updateProgress,
    deleteProgress
  } from "../controllers/ProgressController";
  
const router = Router();

router.post("/", createProgress);
router.get("/", getAllProgress);
router.get("/:id", getProgressById);
router.put("/:id", updateProgress);
router.delete("/:id", deleteProgress);

export default router;