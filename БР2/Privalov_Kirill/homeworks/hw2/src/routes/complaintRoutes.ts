import { Router } from "express";
import { complaintController } from "../controllers/complaintController";

const router = Router();

router.get("/", complaintController.getAll);
router.get("/:id", complaintController.getById);
router.post("/", complaintController.create);
router.put("/:id", complaintController.update);
router.delete("/:id", complaintController.delete);

export default router;
