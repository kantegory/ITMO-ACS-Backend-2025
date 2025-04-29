import { Router } from "express";
import { UserController } from "../controllers/UserConroller";

const router = Router();
const controller = new UserController();

router.get("/", controller.getUsers);
router.get("/:id", controller.getUserById);
router.post("/", controller.createUser);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

export default router;
