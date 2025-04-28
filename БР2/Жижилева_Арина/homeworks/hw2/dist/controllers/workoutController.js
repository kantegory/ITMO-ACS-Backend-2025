"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listWorkouts = exports.deleteWorkout = exports.updateWorkout = exports.getWorkout = exports.createWorkout = void 0;
const Workout_1 = __importDefault(require("../models/Workout"));
const createWorkout = async (req, res) => {
    const workout = new Workout_1.default(req.body);
    const saved = await workout.save();
    res.status(201).json(saved);
};
exports.createWorkout = createWorkout;
const getWorkout = async (req, res) => {
    const workout = await Workout_1.default.findById(req.params.id);
    if (!workout)
        return res.status(404).json({ error: 'Workout not found' });
    res.json(workout);
};
exports.getWorkout = getWorkout;
const updateWorkout = async (req, res) => {
    const updated = await Workout_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};
exports.updateWorkout = updateWorkout;
const deleteWorkout = async (req, res) => {
    await Workout_1.default.findByIdAndDelete(req.params.id);
    res.status(204).end();
};
exports.deleteWorkout = deleteWorkout;
const listWorkouts = async (_, res) => {
    const workouts = await Workout_1.default.find();
    res.json(workouts);
};
exports.listWorkouts = listWorkouts;
