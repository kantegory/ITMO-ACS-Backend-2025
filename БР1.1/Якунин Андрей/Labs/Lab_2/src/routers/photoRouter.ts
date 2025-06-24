import { Router } from "express";
import PhotoController from "../controllers/photoController";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/", auth,PhotoController.createPhoto);
router.get("/", PhotoController.getAllPhotos);
router.get("/:id", PhotoController.getPhotoById);
router.put("/:id",auth, PhotoController.updatePhoto);
router.delete("/:id", auth,PhotoController.deletePhoto);

export default router;
