import { Router } from "express";
import {
    getAllUsers,
    getUserById,
    getUserByUsernameOrEmail,
    updateUser,
    deleteUser
} from "../controllers/userController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(getAllUsers));
router.get("/find", asyncHandler(getUserByUsernameOrEmail)); // через query ?username=... или ?email=...
router.get("/:id", asyncHandler(getUserById));
router.put("/:id", asyncHandler(updateUser));
router.delete("/:id", asyncHandler(deleteUser));

export default router;