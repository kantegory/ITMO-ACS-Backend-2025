import { Router } from "express";
import MessageController from "../controllers/message.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, MessageController.getAllMessages);
router.get("/:id", authenticate, MessageController.getMessageById);
router.post("/", authenticate, MessageController.sendMessage);
router.get("/discussions/all", authenticate, MessageController.getUserDiscussions);
router.get("/property/:propertyId", authenticate, MessageController.getPropertyMessages);
router.put("/:id", authenticate, MessageController.updateMessage);
router.delete("/:id", authenticate, MessageController.deleteMessage);

export default router;