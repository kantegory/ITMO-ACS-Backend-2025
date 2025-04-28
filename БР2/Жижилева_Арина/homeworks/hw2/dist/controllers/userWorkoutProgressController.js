"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProgress = exports.deleteProgress = exports.updateProgress = exports.getProgress = exports.createProgress = void 0;
const UserWorkoutProgress_1 = __importDefault(require("../models/UserWorkoutProgress"));
const createProgress = async (req, res) => {
    const progress = new UserWorkoutProgress_1.default(req.body);
    const saved = await progress.save();
    res.status(201).json(saved);
};
exports.createProgress = createProgress;
const getProgress = async (req, res) => {
    const progress = await UserWorkoutProgress_1.default.findById(req.params.id);
    if (!progress)
        return res.status(404).json({ error: 'Progress not found' });
    res.json(progress);
};
exports.getProgress = getProgress;
const updateProgress = async (req, res) => {
    const updated = await UserWorkoutProgress_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};
exports.updateProgress = updateProgress;
const deleteProgress = async (req, res) => {
    await UserWorkoutProgress_1.default.findByIdAndDelete(req.params.id);
    res.status(204).end();
};
exports.deleteProgress = deleteProgress;
const listProgress = async (_, res) => {
    const progress = await UserWorkoutProgress_1.default.find();
    res.json(progress);
};
exports.listProgress = listProgress;
