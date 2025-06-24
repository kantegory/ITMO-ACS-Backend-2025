import { Router } from "express";
import {
    createLivingComfort,
    getAllLivingComforts,
    getLivingComfortById,
    deleteLivingComfort,
    updateLivingComfort
} from "../controllers/LivingComfortController"

const router = Router();

router.post('/', createLivingComfort);
router.get("/", getAllLivingComforts);
router.get("/:id", getLivingComfortById);
router.delete("/:id", deleteLivingComfort);
router.put("/:id",updateLivingComfort);
export default router;
