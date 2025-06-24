import { Router } from "express";
import * as jobController from "../controller/job.controller";

const router = Router();

router.post("/jobs", jobController.createJob);
router.get("/jobs", jobController.getJobs);
router.get("/jobs/:id", jobController.getJobById);
router.put("/jobs/:id", jobController.updateJob);
router.delete("/jobs/:id", jobController.deleteJob);

export default router;
