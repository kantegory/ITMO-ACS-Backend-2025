import { Router } from "express";
import { createRole, getRoles, getRole, updateRole, deleteRole } from "../controllers/RoleController";

const router = Router();

router.post("/", createRole);
router.get("/", getRoles);
router.get("/:id", getRole);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);

export default router;
