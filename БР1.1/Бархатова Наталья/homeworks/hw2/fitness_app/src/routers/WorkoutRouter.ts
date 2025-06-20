import { Router } from "express";
import {
  createWorkout,
  getAllWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
} from "../controllers/WorkoutController";

const router = Router();

router.post("/", createWorkout);
router.get("/", getAllWorkouts);
router.get("/:id", getWorkoutById);
router.put("/:id", updateWorkout);
router.delete("/:id", deleteWorkout);

export default router;
