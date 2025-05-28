import { Router } from "express";
import { MessageController } from "../controller/MessageController";

const messageRouter = Router();
messageRouter.get("/messages", MessageController.all);
messageRouter.post("/messages", MessageController.create);
messageRouter.get("/messages/:id", MessageController.findOne);
messageRouter.put("/messages/:id", MessageController.update);
messageRouter.delete("/messages/:id", MessageController.delete);

export default messageRouter;