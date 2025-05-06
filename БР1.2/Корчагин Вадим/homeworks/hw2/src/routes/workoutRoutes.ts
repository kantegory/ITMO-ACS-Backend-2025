import { Router } from "express"
import * as workoutController from "../controllers/workoutController"

const router = Router()

router.get("/", workoutController.getAll)
router.get("/:id", workoutController.getById)
router.post("/", workoutController.create)
router.put("/:id", workoutController.update)
router.delete("/:id", workoutController.remove)

export default router
