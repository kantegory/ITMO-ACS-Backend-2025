"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserProgressController_1 = require("../controllers/UserProgressController");
const userProgressRouter = (0, express_1.Router)();
userProgressRouter.get('/', UserProgressController_1.getUserProgresses);
userProgressRouter.get('/:id', (req, res, next) => {
    (0, UserProgressController_1.getUserProgressById)(req, res).catch(next);
});
userProgressRouter.post('/', UserProgressController_1.createUserProgress);
userProgressRouter.put('/:id', UserProgressController_1.updateUserProgress);
userProgressRouter.delete('/:id', UserProgressController_1.deleteUserProgress);
exports.default = userProgressRouter;
