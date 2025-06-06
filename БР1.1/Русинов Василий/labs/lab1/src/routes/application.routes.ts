import { Router } from "express";
import { ApplicationController } from "../controllers/ApplicationController";

const router = Router();
const controller = new ApplicationController();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
