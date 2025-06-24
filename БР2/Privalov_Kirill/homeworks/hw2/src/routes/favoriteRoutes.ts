import { Router } from "express";
import { favoriteController } from "../controllers/favoriteController";

const router = Router();

router.get("/", favoriteController.getAll);
router.get("/:id", favoriteController.getById);
router.post("/", favoriteController.create);
router.put("/:id", favoriteController.update);
router.delete("/:id", favoriteController.delete);

export default router;
