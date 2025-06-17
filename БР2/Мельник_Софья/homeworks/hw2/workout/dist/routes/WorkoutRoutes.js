"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const WorkoutController_1 = require("../controllers/WorkoutController");
const workoutRouter = (0, express_1.Router)();
workoutRouter.get('/', WorkoutController_1.getWorkouts);
workoutRouter.get('/:id', (req, res, next) => {
    (0, WorkoutController_1.getWorkoutById)(req, res).catch(next);
});
workoutRouter.post('/', WorkoutController_1.createWorkout);
workoutRouter.put('/:id', WorkoutController_1.updateWorkout);
workoutRouter.delete('/:id', WorkoutController_1.deleteWorkout);
exports.default = workoutRouter;
