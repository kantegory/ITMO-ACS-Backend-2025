import { Router } from "express";
import { ResumeController } from "../controllers/ResumeController";

const router = Router();
const controller = new ResumeController();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
