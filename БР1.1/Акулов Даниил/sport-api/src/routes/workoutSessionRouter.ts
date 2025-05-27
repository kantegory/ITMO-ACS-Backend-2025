import express from 'express';
import {checkAuth} from "../middleware/checkAuth";
import controller from "../controllers/workoutSessionController";

const router = express.Router();

router.get('/get-all', controller.getAll)
router.get('/get-one/:id', controller.getOne)
router.post('/', checkAuth, controller.create)
router.put('/:id', checkAuth, controller.update)
router.delete('/:id', checkAuth, controller.delete)

export default router;