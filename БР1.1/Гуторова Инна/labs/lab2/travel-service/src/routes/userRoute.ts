import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authenticate } from "../middleware/auth";
import { authorizeAdmin } from "../middleware/authAdm";

const router = Router();

router.get('/profile', authenticate, UserController.getProfile);
router.get('/all', authenticate, authorizeAdmin, UserController.getAllUsers);
router.get('/:id', authenticate, authorizeAdmin, UserController.getUserById);
router.put('/:id', authenticate, authorizeAdmin, UserController.updateUser);
router.delete('/:id', authenticate, authorizeAdmin, UserController.deleteUser);

export default router;