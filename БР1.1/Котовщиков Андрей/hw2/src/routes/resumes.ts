import express from "express"
import * as api from "../controllers/resumes"

export const resumeRouter = express.Router()

resumeRouter.get("/", api.getAllResumes)
resumeRouter.get("/:id", api.getResumeById)
resumeRouter.post("/", api.createResume)
resumeRouter.put("/:id", api.updateResume)
resumeRouter.delete("/:id", api.deleteResumeById)
