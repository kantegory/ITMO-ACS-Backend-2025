import { Router } from "express";
import { createRules, getAllRules, getRulesById, updateRules, deleteRules } from "../controllers/rulesController";

const router = Router();

router.post("/", createRules);
router.get("/", getAllRules);
router.get("/:id", getRulesById);
router.put("/:id", updateRules);
router.delete("/:id", deleteRules);

export default router;
