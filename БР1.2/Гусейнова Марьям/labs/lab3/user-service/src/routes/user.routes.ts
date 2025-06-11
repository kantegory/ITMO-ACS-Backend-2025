import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { asyncHandler } from '../utils/async-handler';

const router = Router();
const userController = new UserController();

router.post("/register", asyncHandler(userController.register));
router.post("/login", asyncHandler(userController.login));

router.get("/", authMiddleware, asyncHandler(userController.getAllUsers));
router.get("/:id", authMiddleware, asyncHandler(userController.getUserById));
router.get("/email/:email", authMiddleware, asyncHandler(userController.getUserByEmail));
router.put("/:id", authMiddleware, asyncHandler(userController.updateUser));
router.delete("/:id", authMiddleware, asyncHandler(userController.deleteUser));

router.get("/internal/exists/:id", asyncHandler(userController.getUserIdInternal));

export default router;