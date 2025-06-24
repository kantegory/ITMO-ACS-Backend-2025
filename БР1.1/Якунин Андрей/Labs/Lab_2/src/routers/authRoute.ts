import { Router } from "express";
import { register, login, updatePassword } from "../controllers/authController";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update-password", auth, updatePassword);

export default router;
