import { Router, Request, Response } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const userController = new UserController();

router.post("/register", async (req, res) => {
  await userController.register(req, res);
});

router.post("/login", async (req, res) => {
  await userController.login(req, res);
});

// Роуты для CRUD операций (требуют аутентификации)
router.get("/users", authMiddleware, userController.getAllUsers);
router.get("/users/:id", authMiddleware, userController.getUserById);
router.get("/users/email/:email", authMiddleware, userController.getUserByEmail);
router.put("/users/:id", authMiddleware, userController.updateUser);
router.delete("/users/:id", authMiddleware, userController.deleteUser);

export default router;