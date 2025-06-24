import { Router } from "express";
import {
    createLivingRules,
    getAllLivingRules,
    getLivingRulesById,
    updateLivingRules,
    deleteLivingRules
} from "../controllers/livingRulesController";

const router = Router();

router.post("/", createLivingRules);
router.get("/", getAllLivingRules);
router.get("/:id", getLivingRulesById);
router.put("/:id", updateLivingRules);
router.delete("/:id", deleteLivingRules);

export default router;
