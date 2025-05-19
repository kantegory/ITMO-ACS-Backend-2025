import { Router } from "express";
import {
    createPhoto,
    getAllPhotos,
    getPhotoById,
    updatePhoto,
    deletePhoto
} from "../controllers/photoController";

const router = Router();


router.post("/", createPhoto);
router.get("/", getAllPhotos);
router.get("/:id", getPhotoById);
router.put("/:id", updatePhoto);
router.delete("/:id", deletePhoto);

export default router;
