import { Router } from "express";
import { PostTagController } from "../controllers/postTag.controller";

const router = Router();

router.get("/", PostTagController.getAll);
router.post("/", PostTagController.create);
router.put("/:id", PostTagController.update);
router.delete("/:id", PostTagController.delete);

export default router;
