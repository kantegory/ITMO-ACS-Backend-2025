import { Router } from "express";
import {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
  } from "../controllers/PostController";
  
const router = Router();

router.post("/", createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
