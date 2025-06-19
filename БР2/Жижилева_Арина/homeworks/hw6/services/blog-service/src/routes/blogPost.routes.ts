import { Router } from "express";
import { BlogController } from "../controllers/blog.controller";

const router = Router();

router.post("/", BlogController.create);
router.get("/", BlogController.getAll);

export default router;