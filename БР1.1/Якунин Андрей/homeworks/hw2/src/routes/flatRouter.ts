import { Router } from "express";
import {
    createFlat,
    getAllFlats,
    getFlatById,
    updateFlat,
    deleteFlat
} from "../controllers/flatController";

const router = Router();

router.post("/", createFlat);
router.get("/", getAllFlats);
router.get("/:id", getFlatById);
router.put("/:id", updateFlat);
router.delete("/:id", deleteFlat);

export default router;
