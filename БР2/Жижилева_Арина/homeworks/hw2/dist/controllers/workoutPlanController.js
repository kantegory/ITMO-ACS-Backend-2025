"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPlans = exports.deletePlan = exports.updatePlan = exports.getPlan = exports.createPlan = void 0;
const WorkoutPlan_1 = __importDefault(require("../models/WorkoutPlan"));
const createPlan = async (req, res) => {
    const plan = new WorkoutPlan_1.default(req.body);
    const saved = await plan.save();
    res.status(201).json(saved);
};
exports.createPlan = createPlan;
const getPlan = async (req, res) => {
    const plan = await WorkoutPlan_1.default.findById(req.params.id);
    if (!plan)
        return res.status(404).json({ error: 'Plan not found' });
    res.json(plan);
};
exports.getPlan = getPlan;
const updatePlan = async (req, res) => {
    const updated = await WorkoutPlan_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};
exports.updatePlan = updatePlan;
const deletePlan = async (req, res) => {
    await WorkoutPlan_1.default.findByIdAndDelete(req.params.id);
    res.status(204).end();
};
exports.deletePlan = deletePlan;
const listPlans = async (_, res) => {
    const plans = await WorkoutPlan_1.default.find();
    res.json(plans);
};
exports.listPlans = listPlans;
