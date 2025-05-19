import { Router } from "express";
import { transactionController } from "../controllers/transactionController";

const router = Router();

router.get("/", transactionController.getAll);
router.get("/:id", transactionController.getById);
router.post("/", transactionController.create);
router.put("/:id", transactionController.update);
router.delete("/:id", transactionController.delete);

export default router;
