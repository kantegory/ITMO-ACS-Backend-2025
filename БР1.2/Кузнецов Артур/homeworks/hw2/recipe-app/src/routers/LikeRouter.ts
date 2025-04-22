import { Router } from "express";
import { createLike, getLikes, getLike, updateLike, deleteLike } from "../controllers/LikeController";

const router = Router();

router.post("/", createLike);
router.get("/", getLikes);
router.get("/:id", getLike);
router.put("/:id", updateLike);
router.delete("/:id", deleteLike);

export default router;
