import { Router } from "express";
import {
    getAllUsers,
    getUserById,
    getUserByUsernameOrEmail,
    updateUser,
    deleteUser
} from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getAllUsers);
router.get("/find", getUserByUsernameOrEmail);
router.get("/:id", getUserById);
router.put("/:id", authenticateToken, updateUser);
router.delete("/:id", authenticateToken, deleteUser);

export default router;