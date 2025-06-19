import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { getUserByIdOrEmail } from "../controllers/getUserByIdOrEmail";

const router = Router();

router.get("/", UserController.getAll);
router.post("/", UserController.create);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);
router.get("/find", getUserByIdOrEmail);
export default router;
