import { Router } from "express";
import * as educationController from "../controller/education.controller";

const router = Router();

router.post("/educations", educationController.createEducation);
router.get("/educations", educationController.getEducations);
router.get("/educations/:id", educationController.getEducationById);
router.put("/educations/:id", educationController.updateEducation);
router.delete("/educations/:id", educationController.deleteEducation);

export default router;
