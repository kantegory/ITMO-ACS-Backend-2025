import { Router } from "express";
import { userController } from "../controllers/userController";

const router = Router();

router.get("/", userController.getAll);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);
router.get("/:id", userController.getById);


export default router;
