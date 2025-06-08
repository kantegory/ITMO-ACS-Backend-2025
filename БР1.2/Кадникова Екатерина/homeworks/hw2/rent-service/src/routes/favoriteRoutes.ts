import { Router } from "express";
import {
    addFavorite,
    getAllFavorites,
    getFavoritesByUser,
    removeFavorite,
} from "../controllers/favoriteController";

const router = Router();

router.post("/", addFavorite);
router.get("/", getAllFavorites);
router.get("/user/:userId", getFavoritesByUser);
router.delete("/:userId/:propertyId", removeFavorite);

export default router;