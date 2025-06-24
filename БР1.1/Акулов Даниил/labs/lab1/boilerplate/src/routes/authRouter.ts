import express from 'express';
import authController from "../controllers/authController";
import {checkAuth} from "../middleware/checkAuth";

const router = express.Router();

router.post('/registration', authController.registration)
router.post('/login', authController.login)
router.get('/check', checkAuth, authController.check)
router.get('/users', authController.usersHandler)

export default router;