import { Router } from "express";
import { AthleteController } from "../controllers/AthleteController";

const router = Router();

router.get("/", AthleteController.getAll);
router.get("/:id(\\d+)", AthleteController.getById);
router.post("/", AthleteController.create);
router.put("/:id(\\d+)", AthleteController.update);
router.delete("/:id(\\d+)", AthleteController.delete);

export default router;
