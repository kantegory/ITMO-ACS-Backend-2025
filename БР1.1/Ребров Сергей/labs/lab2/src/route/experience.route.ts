import { Router } from "express";
import * as experienceController from "../controller/experience.controller";

const router = Router();

router.post("/experiences", experienceController.createExperience);
router.get("/experiences", experienceController.getExperiences);
router.get("/experiences/:id", experienceController.getExperienceById);
router.put("/experiences/:id", experienceController.updateExperience);
router.delete("/experiences/:id", experienceController.deleteExperience);

export default router;
