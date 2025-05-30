import { Router } from "express";
import {
    sendMessage,
    getAllMessages,
    getMessagesBetweenUsers,
    updateMessage,
    deleteMessage
} from "../controllers/messageController";

const router = Router();

router.post("/", sendMessage);
router.get("/", getAllMessages);
router.get("/conversation", getMessagesBetweenUsers); // ?user1Id=1&user2Id=2&propertyId=3 (optional)
router.put("/:id", updateMessage);
router.delete("/:id", deleteMessage);

export default router;