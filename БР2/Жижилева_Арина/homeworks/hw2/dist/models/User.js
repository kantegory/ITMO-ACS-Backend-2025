"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    registration_date: Date,
    age: Number,
    gender: String,
    weight: Number,
    height: Number,
    workoutPlans: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'WorkoutPlan' }]
});
exports.default = mongoose_1.default.model('User', userSchema);
