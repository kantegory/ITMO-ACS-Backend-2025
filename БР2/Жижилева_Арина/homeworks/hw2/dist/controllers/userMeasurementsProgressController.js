"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listMeasurements = exports.deleteMeasurement = exports.updateMeasurement = exports.getMeasurement = exports.createMeasurement = void 0;
const UserMeasurementsProgress_1 = __importDefault(require("../models/UserMeasurementsProgress"));
const createMeasurement = async (req, res) => {
    const measure = new UserMeasurementsProgress_1.default(req.body);
    const saved = await measure.save();
    res.status(201).json(saved);
};
exports.createMeasurement = createMeasurement;
const getMeasurement = async (req, res) => {
    const measure = await UserMeasurementsProgress_1.default.findById(req.params.id);
    if (!measure)
        return res.status(404).json({ error: 'Measurement not found' });
    res.json(measure);
};
exports.getMeasurement = getMeasurement;
const updateMeasurement = async (req, res) => {
    const updated = await UserMeasurementsProgress_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};
exports.updateMeasurement = updateMeasurement;
const deleteMeasurement = async (req, res) => {
    await UserMeasurementsProgress_1.default.findByIdAndDelete(req.params.id);
    res.status(204).end();
};
exports.deleteMeasurement = deleteMeasurement;
const listMeasurements = async (_, res) => {
    const measurements = await UserMeasurementsProgress_1.default.find();
    res.json(measurements);
};
exports.listMeasurements = listMeasurements;
