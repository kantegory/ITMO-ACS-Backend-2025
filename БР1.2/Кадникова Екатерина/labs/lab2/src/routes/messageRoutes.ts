import { Router } from "express";
import {
    getAllMessages,
    getMessageById,
    sendMessage,
    getUsersDiscussions,
    getPropertyMessages,
    updateMessage,
    deleteMessage
} from "../controllers/messageController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/my-discussions", authenticateToken, getUsersDiscussions);
router.get("/", authenticateToken, getAllMessages);
router.get("/:id", authenticateToken, getMessageById);
router.post("/", authenticateToken, sendMessage);
router.get("/property/:propertyId", authenticateToken, getPropertyMessages);
router.put("/:id", authenticateToken, updateMessage);
router.delete("/:id", authenticateToken, deleteMessage);

export default router;