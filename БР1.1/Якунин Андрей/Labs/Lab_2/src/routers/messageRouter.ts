import { Router } from "express";
import MessageController from "../controllers/messageController";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/", auth, MessageController.postMessage);
router.get("/", auth, MessageController.fetchUserMessages);

export default router;
