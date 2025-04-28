import { Router } from "express";
import {
    createUser,
    loginUser,
    getAllUsers,
    getUserByIdOrEmail,
    updateUser,
    deleteUser,
} from "../controllers/userController";

const router = Router();

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/:identifier", getUserByIdOrEmail);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;