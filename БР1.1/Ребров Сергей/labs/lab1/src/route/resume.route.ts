import { Router } from "express";
import * as resumeController from "../controller/resume.controller";

const router = Router();

router.post("/resumes", resumeController.createResume);
router.get("/resumes", resumeController.getResumes);
router.get("/resumes/:id", resumeController.getResumeById);
router.put("/resumes/:id", resumeController.updateResume);
router.delete("/resumes/:id", resumeController.deleteResume);

export default router;
