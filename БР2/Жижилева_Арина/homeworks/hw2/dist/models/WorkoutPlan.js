"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const workoutPlanSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    level: String,
    duration_weeks: Number
});
exports.default = mongoose_1.default.model('WorkoutPlan', workoutPlanSchema);
