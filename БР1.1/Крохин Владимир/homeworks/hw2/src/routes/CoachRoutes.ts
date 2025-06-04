// src/routes/coachRoutes.ts
import { Router } from "express";
import { CoachController } from "../controllers/CoachController";

const router = Router();

router.get("/", CoachController.getAll);
router.get("/:id(\\d+)", CoachController.getById);
router.post("/", CoachController.create);
router.put("/:id(\\d+)", CoachController.update);
router.delete("/:id(\\d+)", CoachController.delete);

export default router;
