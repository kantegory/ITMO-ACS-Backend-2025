"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const workoutSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    video_url: String,
    duration_minutes: Number,
    difficulty: String,
    type: String
});
exports.default = mongoose_1.default.model('Workout', workoutSchema);
