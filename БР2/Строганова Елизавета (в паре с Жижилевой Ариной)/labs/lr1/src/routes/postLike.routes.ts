import { Router } from "express";
import { PostLikeController } from "../controllers/postLike.controller";

const router = Router();

router.get("/", PostLikeController.getAll);
router.get("/:id", PostLikeController.getById);
router.post("/", PostLikeController.create);
router.put("/:id", PostLikeController.update);
router.delete("/:id", PostLikeController.delete);

export default router;