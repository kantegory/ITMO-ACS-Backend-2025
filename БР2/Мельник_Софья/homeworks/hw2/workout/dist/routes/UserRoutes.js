"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const userRouter = (0, express_1.Router)();
userRouter.get('/', UserController_1.getUsers);
userRouter.get('/search/email', (req, res, next) => {
    (0, UserController_1.getUserByIdOrEmail)(req, res).catch(next);
});
userRouter.get('/:id', (req, res, next) => {
    (0, UserController_1.getUserByIdOrEmail)(req, res).catch(next);
});
userRouter.post('/', UserController_1.createUser);
userRouter.put('/:id', UserController_1.updateUser);
userRouter.delete('/:id', UserController_1.deleteUser);
exports.default = userRouter;
