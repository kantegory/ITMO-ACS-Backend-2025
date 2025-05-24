import { Router } from "express";
import { createComment, getComments, getComment, updateComment, deleteComment } from "../controllers/CommentController";

const router = Router();

router.post("/", createComment);
router.get("/", getComments);
router.get("/:id", getComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
