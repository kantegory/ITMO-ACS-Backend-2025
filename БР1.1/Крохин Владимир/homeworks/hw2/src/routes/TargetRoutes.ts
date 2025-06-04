import { Router } from "express";
import { TargetController } from "../controllers/TargetController";

const router = Router();

router.get("/", TargetController.getAll);
router.get("/:id(\\d+)", TargetController.getById);
router.post("/", TargetController.create);
router.put("/:id(\\d+)", TargetController.update);
router.delete("/:id(\\d+)", TargetController.delete);

export default router;
