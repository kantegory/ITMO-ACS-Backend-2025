import { Router } from "express";
import {
    createLiving,
    getAllLiving,
    getLivingById,
    updateLiving,
    deleteLiving
} from "../controllers/LivingController";

const livingRouter = Router();

livingRouter.post("/", createLiving);
livingRouter.get("/", getAllLiving);
livingRouter.get("/:id", getLivingById);
livingRouter.put("/:id", updateLiving);
livingRouter.delete("/:id", deleteLiving);

export default livingRouter;
