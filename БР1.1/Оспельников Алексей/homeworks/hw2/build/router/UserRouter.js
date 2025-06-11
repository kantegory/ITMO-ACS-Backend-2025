"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controller/UserController");
const userRouter = (0, express_1.Router)();
userRouter.get("/users", UserController_1.UserController.all);
userRouter.post("/users", UserController_1.UserController.create);
userRouter.get("/users/:id", UserController_1.UserController.findOne);
userRouter.put("/users/:id", UserController_1.UserController.update);
userRouter.delete("/users/:id", UserController_1.UserController.delete);
exports.default = userRouter;
//# sourceMappingURL=UserRouter.js.map