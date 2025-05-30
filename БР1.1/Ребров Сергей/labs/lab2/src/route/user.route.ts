import { Router } from "express";
import * as userController from "../controller/user.controller";

const router = Router();

router.get("/users/search", userController.getUserByIdOrEmail);

router.post("/users", userController.createUser);
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

export default router;
