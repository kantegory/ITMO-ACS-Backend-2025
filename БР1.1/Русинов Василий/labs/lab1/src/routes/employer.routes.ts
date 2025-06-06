import { Router } from "express";
import { EmployerController } from "../controllers/EmployerController";

const router = Router();
const controller = new EmployerController();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
