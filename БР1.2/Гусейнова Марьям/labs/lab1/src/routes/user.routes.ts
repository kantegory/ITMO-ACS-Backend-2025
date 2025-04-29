import { Router, Request, Response } from "express";
import { UserController } from "../controllers/user.controller"

const router = Router();
const userController = new UserController();

router.get("/users", async (req: Request, res: Response) => {
  await userController.getAll(req, res);
});

router.get("/users/:id", async (req: Request, res: Response) => {
  await userController.getOne(req, res);
});

router.post("/users", async (req: Request, res: Response) => {
  await userController.create(req, res);
});

router.put("/users/:id", async (req: Request, res: Response) => {
  await userController.update(req, res);
});

router.delete("/users/:id", async (req: Request, res: Response) => {
  await userController.delete(req, res);
});

export default router;