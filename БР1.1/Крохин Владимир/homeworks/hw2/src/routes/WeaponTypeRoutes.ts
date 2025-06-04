import { Router } from "express";
import { WeaponTypeController } from "../controllers/WeaponTypeController";

const router = Router();

router.get("/", WeaponTypeController.getAll);
router.get("/:id(\\d+)", WeaponTypeController.getById);
router.post("/", WeaponTypeController.create);
router.put("/:id(\\d+)", WeaponTypeController.update);
router.delete("/:id(\\d+)", WeaponTypeController.delete);

export default router;
