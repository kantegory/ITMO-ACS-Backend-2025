import { Router } from "express";
import { BlogPostController } from "../controllers/blogPost.controller";

const router = Router();

router.post("/", BlogPostController.create);          // создать пост
router.get("/", BlogPostController.getAll);            // получить все посты
router.get("/:id", BlogPostController.getById);         // получить пост по id
router.put("/:id", BlogPostController.update);          // обновить пост
router.delete("/:id", BlogPostController.delete);       // удалить пост

export default router;
