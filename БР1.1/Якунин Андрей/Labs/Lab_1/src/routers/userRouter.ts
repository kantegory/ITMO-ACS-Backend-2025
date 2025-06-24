import { Router } from "express";
import { getProfile, getAllUsers } from "../controllers/userController";
import { auth } from "../middleware/auth";

const router = Router();


router.get("/me", auth, getProfile);
router.get("/", auth, getAllUsers);

export default router;
