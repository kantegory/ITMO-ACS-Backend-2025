import { Router } from "express";
import { messageController } from "../controllers/messageController";

const router = Router();

router.get("/", messageController.getAll);
router.get("/:id", messageController.getById);
router.post("/", messageController.create);
router.put("/:id", messageController.update);
router.delete("/:id", messageController.delete);

export default router;
