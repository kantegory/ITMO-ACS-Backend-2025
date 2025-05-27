import express from 'express';
import {checkAuth} from "../middleware/checkAuth";
import userController from "../controllers/userController";

const router = express.Router();

router.get('/get-all', userController.getAll)
router.get('/get-one/:id', userController.getOne)
router.put('/', checkAuth, userController.update)
router.delete('/', checkAuth, userController.delete)
router.get('/get-workout-plans/:userId', userController.getWorkoutPlans)
router.post('/add-workout-plans', checkAuth, userController.addWorkoutPlan)
router.delete('/remove-workout-plans/:workoutPlanId', checkAuth, userController.removeWorkoutPlan)

export default router;