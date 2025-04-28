import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();

router.post("/", UserController.create);
router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.get("/email/:email", UserController.getByEmail);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);

export default router;
