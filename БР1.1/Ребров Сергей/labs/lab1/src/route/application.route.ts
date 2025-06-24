import { Router } from "express";
import * as applicationController from "../controller/application.controller";

const router = Router();

router.post("/applications", applicationController.createApplication);
router.get("/applications", applicationController.getApplications);
router.get("/applications/:id", applicationController.getApplicationById);
router.put("/applications/:id", applicationController.updateApplication);
router.delete("/applications/:id", applicationController.deleteApplication);

export default router;
