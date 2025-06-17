"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const WorkoutPlanController_1 = require("../controllers/WorkoutPlanController");
const workoutPlanRouter = (0, express_1.Router)();
workoutPlanRouter.get('/', WorkoutPlanController_1.getWorkoutPlans);
workoutPlanRouter.get('/:id', (req, res, next) => {
    (0, WorkoutPlanController_1.getWorkoutPlanById)(req, res).catch(next);
});
workoutPlanRouter.post('/', WorkoutPlanController_1.createWorkoutPlan);
workoutPlanRouter.put('/:id', WorkoutPlanController_1.updateWorkoutPlan);
workoutPlanRouter.delete('/:id', WorkoutPlanController_1.deleteWorkoutPlan);
exports.default = workoutPlanRouter;
