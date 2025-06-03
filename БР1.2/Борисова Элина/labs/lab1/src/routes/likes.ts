import { Router } from "express";
import { createLike, getLikes, deleteLike } from "../controllers/like.controller";

const router = Router();

router.post("/", createLike);
router.get("/", getLikes);
router.delete("/", deleteLike);

export default router;
