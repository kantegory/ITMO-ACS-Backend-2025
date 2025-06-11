import { Router } from "express";
import RulesController from "../controllers/rulesController";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/",auth, RulesController.createRule);
router.get("/", RulesController.getAllRules);
router.get("/:id", RulesController.getRuleById);
router.put("/:id",auth, RulesController.updateRule);
router.delete("/:id", auth,RulesController.deleteRule);

export default router;
