import { Router } from "express";
import { getUsers } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { loginUser, registerUser } from "../controllers/user.controller";
const router = Router();

router.get("/", getUsers);

router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;
