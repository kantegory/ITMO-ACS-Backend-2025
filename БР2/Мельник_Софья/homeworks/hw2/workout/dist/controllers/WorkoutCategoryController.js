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
exports.deleteWorkoutCategory = exports.updateWorkoutCategory = exports.createWorkoutCategory = exports.getWorkoutCategoryById = exports.getWorkoutCategories = void 0;
const app_data_source_1 = require("../config/app-data-source");
const WorkoutCategory_1 = require("../entities/WorkoutCategory");
const workoutCategoryRepository = app_data_source_1.AppDataSource.getRepository(WorkoutCategory_1.WorkoutCategory);
const getWorkoutCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const workoutCategories = yield workoutCategoryRepository.find();
    res.json(workoutCategories);
});
exports.getWorkoutCategories = getWorkoutCategories;
const getWorkoutCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const workoutCategory = yield workoutCategoryRepository.findOneBy({ id: Number(id) });
    if (!workoutCategory) {
        return res.status(404).json({ message: 'Workout category not found' });
    }
    res.json(workoutCategory);
});
exports.getWorkoutCategoryById = getWorkoutCategoryById;
const createWorkoutCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newWorkoutCategory = workoutCategoryRepository.create(req.body);
    const result = yield workoutCategoryRepository.save(newWorkoutCategory);
    res.status(201).json(result);
});
exports.createWorkoutCategory = createWorkoutCategory;
const updateWorkoutCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield workoutCategoryRepository.update(id, req.body);
    res.json({ message: 'Workout category updated' });
});
exports.updateWorkoutCategory = updateWorkoutCategory;
const deleteWorkoutCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield workoutCategoryRepository.delete(id);
    res.json({ message: 'Workout category deleted' });
});
exports.deleteWorkoutCategory = deleteWorkoutCategory;
