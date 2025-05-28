import { Router } from "express";
import {
    createTrainingPlan,
    getAllTrainingPlans,
    getTrainingPlanById,
    updateTrainingPlan,
    deleteTrainingPlan
  } from "../controllers/TrainingPlanController";
  
const router = Router();

router.post("/", createTrainingPlan);
router.get("/", getAllTrainingPlans);
router.get("/:id", getTrainingPlanById);
router.put("/:id", updateTrainingPlan);
router.delete("/:id", deleteTrainingPlan);

export default router;