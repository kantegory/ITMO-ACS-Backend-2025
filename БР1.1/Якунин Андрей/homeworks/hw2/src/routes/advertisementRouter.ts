import { Router } from "express"
import {
    createAdvertisement,
    getAllAdvertisements,
    getAdvertisementById,
    updateAdvertisement,
    deleteAdvertisement

} from "../controllers/advertisementController"

const router = Router();

router.post("/", createAdvertisement);
router.get("/", getAllAdvertisements);
router.get("/:id", getAdvertisementById);
router.put("/:id", updateAdvertisement);
router.delete("/:id", deleteAdvertisement);

export default router;