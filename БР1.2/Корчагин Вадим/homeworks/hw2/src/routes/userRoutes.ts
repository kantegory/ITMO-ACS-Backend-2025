import { Router } from "express"
import * as userController from "../controllers/userController"

const router = Router()

router.get("/", userController.getAll)
router.get("/id/:id", userController.getById)
router.get("/email/:email", userController.getByEmail)
router.post("/", userController.create)
router.put("/:id", userController.update)
router.delete("/:id", userController.remove)

export default router
