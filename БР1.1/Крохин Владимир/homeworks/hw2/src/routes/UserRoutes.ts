import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();

// CRUD для User
router.get("/", UserController.getAll);
router.get("/:id(\\d+)", UserController.getById);
router.get("/email/:email", UserController.getByEmail);
router.post("/", UserController.create);
router.put("/:id(\\d+)", UserController.update);
router.delete("/:id(\\d+)", UserController.delete);

export default router;
