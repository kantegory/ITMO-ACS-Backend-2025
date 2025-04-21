"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MessageController_1 = require("../controller/MessageController");
const messageRouter = (0, express_1.Router)();
messageRouter.get("/message", MessageController_1.MessageController.all);
messageRouter.post("/message", MessageController_1.MessageController.create);
messageRouter.get("/message/:id", MessageController_1.MessageController.findOne);
messageRouter.put("/message/:id", MessageController_1.MessageController.update);
messageRouter.delete("/message/:id", MessageController_1.MessageController.delete);
exports.default = userRouter;
//# sourceMappingURL=messageRouter.js.map