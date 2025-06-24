import { Router } from "express";
import { BlogPostController } from "../controllers/blogPost.controller";

const router = Router();

router.get("/", BlogPostController.getAll);
router.get("/:id", BlogPostController.getById);
router.post("/", BlogPostController.create);
router.put("/:id", BlogPostController.update);
router.delete("/:id", BlogPostController.delete);

export default router;