import { Router } from "express";
import advertisementController from "../controllers/advertisementController";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/",auth, advertisementController.createAdvertisement);
router.get("/", advertisementController.getAllAdvertisements);
router.get("/:id", advertisementController.getAdvertisementById);
router.put("/:id",auth, advertisementController.updateAdvertisement);
router.delete("/:id",auth, advertisementController.deleteAdvertisement);

export default router;
