import { Router } from "express";
import FavoriteController from "../controllers/favorite.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, FavoriteController.getAllFavorites);
router.get("/:id", authenticate, FavoriteController.getFavoriteById);
router.post("/", authenticate, FavoriteController.addFavorite);
router.put("/:id", authenticate, FavoriteController.updateFavorite);
router.delete("/:id", authenticate, FavoriteController.removeFavorite);

export default router;