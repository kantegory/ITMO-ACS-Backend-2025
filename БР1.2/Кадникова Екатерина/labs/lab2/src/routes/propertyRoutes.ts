import { Router } from "express";
import {
    getAllProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
    searchProperties
} from "../controllers/propertyController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getAllProperties);
router.get("/search", searchProperties);
router.get("/:id", getPropertyById);
router.post("/", authenticateToken, createProperty);
router.put("/:id", authenticateToken, updateProperty);
router.delete("/:id", authenticateToken, deleteProperty);

export default router;