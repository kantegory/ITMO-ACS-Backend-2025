"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ReviewController_1 = require("../controller/ReviewController");
const reviewRouter = (0, express_1.Router)();
reviewRouter.get("/reviews", ReviewController_1.ReviewController.all);
reviewRouter.post("/reviews", ReviewController_1.ReviewController.create);
reviewRouter.get("/reviews/:id", ReviewController_1.ReviewController.findOne);
reviewRouter.put("/reviews/:id", ReviewController_1.ReviewController.update);
reviewRouter.delete("/reviews/:id", ReviewController_1.ReviewController.delete);
exports.default = reviewRouter;
//# sourceMappingURL=reviewRouter.js.map