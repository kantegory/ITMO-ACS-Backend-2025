import {UserController} from "../controllers/user.controller";
import {Router} from "express";

const router = Router();
const controller = new UserController();

router.get("/:id", controller.getUserById);
router.get('/by-mail/:mail', controller.getUserByMail);

export default router;