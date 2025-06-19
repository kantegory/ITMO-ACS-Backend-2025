import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();

router.post("/", UserController.register);
router.post("/login", UserController.login);
router.get("/verify-token", UserController.verifyToken);

export default router;