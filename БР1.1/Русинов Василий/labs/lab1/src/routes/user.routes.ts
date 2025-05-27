import { Router } from "express";
import { UserController } from "../controllers/UserController";
import {authenticateJWT} from "../middlewares/auth.middleware";

const router = Router();
const controller = new UserController();

router.post("/", authenticateJWT, controller.create.bind(controller));
router.get("/", authenticateJWT, controller.getAll.bind(controller));
router.get("/email/:email", authenticateJWT, controller.getByEmail.bind(controller));
router.get("/:id", authenticateJWT, controller.getById.bind(controller));
router.put("/:id", authenticateJWT, controller.update.bind(controller));
router.delete("/:id", authenticateJWT, controller.delete.bind(controller));

export default router;
