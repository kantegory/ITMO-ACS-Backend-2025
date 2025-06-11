import { Router } from "express";
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from "../controllers/categoryController";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/", auth, createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/:id",auth, updateCategory);
router.delete("/:id", auth,deleteCategory);

export default router;
