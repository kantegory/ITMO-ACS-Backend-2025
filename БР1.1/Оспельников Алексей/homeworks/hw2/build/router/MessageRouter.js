"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MessageController_1 = require("../controller/MessageController");
const messageRouter = (0, express_1.Router)();
messageRouter.get("/messages", MessageController_1.MessageController.all);
messageRouter.post("/messages", MessageController_1.MessageController.create);
messageRouter.get("/messages/:id", MessageController_1.MessageController.findOne);
messageRouter.put("/messages/:id", MessageController_1.MessageController.update);
messageRouter.delete("/messages/:id", MessageController_1.MessageController.delete);
exports.default = messageRouter;
//# sourceMappingURL=MessageRouter.js.map