"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PlanController_1 = require("../controllers/PlanController");
const planRouter = (0, express_1.Router)();
planRouter.get('/', PlanController_1.getPlans);
planRouter.get('/:id', (req, res, next) => {
    (0, PlanController_1.getPlanById)(req, res).catch(next);
});
planRouter.post('/', PlanController_1.createPlan);
planRouter.put('/:id', PlanController_1.updatePlan);
planRouter.delete('/:id', PlanController_1.deletePlan);
exports.default = planRouter;
