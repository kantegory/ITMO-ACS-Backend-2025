import { Router } from "express";
import FlatController from "../controllers/flatController";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/", auth, FlatController.createFlat);
router.get("/", FlatController.getAllFlats);
router.get("/:id", FlatController.getFlatById);
router.put("/:id", auth, FlatController.updateFlat);
router.delete("/:id", auth, FlatController.deleteFlat);

export default router;
