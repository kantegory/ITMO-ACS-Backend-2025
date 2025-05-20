import { Router, Request, Response } from "express";
import { UserController } from "../controllers/user.controller"
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const userController = new UserController();

router.post("/register", async (req, res) => {
  await userController.register(req, res);
});

router.post("/login", async (req, res) => {
  await userController.login(req, res);
});

router.get("/users", authMiddleware, async (req: Request, res: Response) => {
  await userController.getAll(req, res);
});

router.get("/users/:id", authMiddleware, async (req: Request, res: Response) => {
  await userController.getOne(req, res);
});

router.put("/users/:id", authMiddleware, async (req: Request, res: Response) => {
  await userController.update(req, res);
});

router.delete("/users/:id", authMiddleware, async (req: Request, res: Response) => {
  await userController.delete(req, res);
});

export default router;