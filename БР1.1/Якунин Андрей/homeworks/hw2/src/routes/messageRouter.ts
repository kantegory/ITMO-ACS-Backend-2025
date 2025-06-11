import { Router } from "express";
import { createMessage, getAllMessages, getMessageById, updateMessage, deleteMessage } from "../controllers/messageController";

const router = Router();

router.post("/", createMessage);
router.get("/", getAllMessages);
router.get("/:id", getMessageById);
router.put("/:id", updateMessage);
router.delete("/:id", deleteMessage);

export default router;
