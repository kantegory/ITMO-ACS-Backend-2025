"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const WorkoutCategoryController_1 = require("../controllers/WorkoutCategoryController");
const workoutCategoryRouter = (0, express_1.Router)();
workoutCategoryRouter.get('/', WorkoutCategoryController_1.getWorkoutCategories);
workoutCategoryRouter.get('/:id', (req, res, next) => {
    (0, WorkoutCategoryController_1.getWorkoutCategoryById)(req, res).catch(next);
});
workoutCategoryRouter.post('/', WorkoutCategoryController_1.createWorkoutCategory);
workoutCategoryRouter.put('/:id', WorkoutCategoryController_1.updateWorkoutCategory);
workoutCategoryRouter.delete('/:id', WorkoutCategoryController_1.deleteWorkoutCategory);
exports.default = workoutCategoryRouter;
