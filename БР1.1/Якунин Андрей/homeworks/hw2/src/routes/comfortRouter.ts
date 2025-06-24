import { Router } from "express";
import {
    getComfortById,
    getAllComfort,
    updateComfort,
    deleteComfort,
    createComfort
} from "../controllers/comfortController";

const router = Router();

router.get("/", getAllComfort);
router.get("/:id", getComfortById);
router.post("/", createComfort);
router.put("/:id", updateComfort);
router.delete("/:id", deleteComfort);
export default router;