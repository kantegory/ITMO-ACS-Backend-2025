import { Router } from "express";
import { createSubscription, getSubscriptions, deleteSubscription } from "../controllers/subscription.controller";

const router = Router();

router.post("/", createSubscription);
router.get("/", getSubscriptions);
router.delete("/", deleteSubscription);

export default router;
