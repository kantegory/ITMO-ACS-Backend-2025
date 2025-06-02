import { Router } from "express";
import { PostCommentController } from "../controllers/postComment.controller";

const router = Router();

router.get("/", PostCommentController.getAll);
router.get("/:id", PostCommentController.getById);
router.post("/", PostCommentController.create);
router.put("/:id", PostCommentController.update);
router.delete("/:id", PostCommentController.delete);

export default router;