import { Router } from "express";
import { MessageController } from "../controller/MessageController";

const messageRouter = Router();
messageRouter.get("/message", MessageController.all);
messageRouter.post("/message", MessageController.create);
messageRouter.get("/message/:id", MessageController.findOne);
messageRouter.put("/message/:id", MessageController.update);
messageRouter.delete("/message/:id", MessageController.delete);

export default userRouter;