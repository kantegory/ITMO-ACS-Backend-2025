"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWorkoutPlan = exports.updateWorkoutPlan = exports.createWorkoutPlan = exports.getWorkoutPlanById = exports.getWorkoutPlans = void 0;
const app_data_source_1 = require("../config/app-data-source");
const WorkoutPlan_1 = require("../entities/WorkoutPlan");
const workoutPlanRepository = app_data_source_1.AppDataSource.getRepository(WorkoutPlan_1.WorkoutPlan);
const getWorkoutPlans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const workoutPlans = yield workoutPlanRepository.find();
    res.json(workoutPlans);
});
exports.getWorkoutPlans = getWorkoutPlans;
const getWorkoutPlanById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const workoutPlan = yield workoutPlanRepository.findOneBy({ id: Number(id) });
    if (!workoutPlan) {
        return res.status(404).json({ message: 'Workout plan not found' });
    }
    res.json(workoutPlan);
});
exports.getWorkoutPlanById = getWorkoutPlanById;
const createWorkoutPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newWorkoutPlan = workoutPlanRepository.create(req.body);
    const result = yield workoutPlanRepository.save(newWorkoutPlan);
    res.status(201).json(result);
});
exports.createWorkoutPlan = createWorkoutPlan;
const updateWorkoutPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield workoutPlanRepository.update(id, req.body);
    res.json({ message: 'Workout plan updated' });
});
exports.updateWorkoutPlan = updateWorkoutPlan;
const deleteWorkoutPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield workoutPlanRepository.delete(id);
    res.json({ message: 'Workout plan deleted' });
});
exports.deleteWorkoutPlan = deleteWorkoutPlan;
