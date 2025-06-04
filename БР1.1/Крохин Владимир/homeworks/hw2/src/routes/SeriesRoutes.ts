import { Router } from "express";
import { SeriesController } from "../controllers/SeriesController";

const router = Router();

router.get("/", SeriesController.getAll);
router.get("/:id(\\d+)", SeriesController.getById);
router.post("/", SeriesController.create);
router.put("/:id(\\d+)", SeriesController.update);
router.delete("/:id(\\d+)", SeriesController.delete);

export default router;
