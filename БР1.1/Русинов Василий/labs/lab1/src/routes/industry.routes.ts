import { Router } from "express";
import { IndustryController } from "../controllers/IndustryController";

const router = Router();
const controller = new IndustryController();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
