import { Router } from "express";
import { JobController } from "../controllers/JobController";

const router = Router();
const controller = new JobController();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
