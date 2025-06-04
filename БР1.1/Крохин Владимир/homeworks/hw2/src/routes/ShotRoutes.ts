import { Router } from "express";
import { ShotController } from "../controllers/ShotController";

const router = Router();

router.get("/", ShotController.getAll);
router.get("/:id(\\d+)", ShotController.getById);
router.post("/", ShotController.create);
router.put("/:id(\\d+)", ShotController.update);
router.delete("/:id(\\d+)", ShotController.delete);

export default router;
