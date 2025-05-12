import { Router } from "express";
import { createComment, getComments, getCommentById, deleteComment } from "../controllers/comment.controller";

const router = Router();

router.post("/", createComment);
router.get("/", getComments);
router.get("/:id", getCommentById);
router.delete("/:id", deleteComment);

export default router;
