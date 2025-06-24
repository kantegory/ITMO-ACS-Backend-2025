import { Router } from "express";
import * as roleController from "../controller/role.controller";

const router = Router();

router.post("/roles", roleController.createRole);
router.get("/roles", roleController.getRoles);
router.get("/roles/:id", roleController.getRoleById);
router.put("/roles/:id", roleController.updateRole);
router.delete("/roles/:id", roleController.deleteRole);

export default router;
