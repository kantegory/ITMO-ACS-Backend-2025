import { Router } from "express";
import {
    createSubscription,
    getSubscriptions,
    getSubscription,
    updateSubscription,
    deleteSubscription
} from "../controllers/SubscriptionController";

const router = Router();

router.post("/", createSubscription);
router.get("/", getSubscriptions);
router.get("/:id", getSubscription);
router.put("/:id", updateSubscription);
router.delete("/:id", deleteSubscription);

export default router;
