import express from 'express';
import {checkAuth} from "../middleware/checkAuth";
import userController from "../controllers/userController";

const router = express.Router();

router.get('/get-all', userController.getAll)
router.get('/get-one/:id', userController.getOne)
router.put('/', checkAuth, userController.update)
router.delete('/', checkAuth, userController.delete)

export default router;