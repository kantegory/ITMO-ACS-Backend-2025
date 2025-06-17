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
exports.deleteWorkout = exports.updateWorkout = exports.createWorkout = exports.getWorkoutById = exports.getWorkouts = void 0;
const app_data_source_1 = require("../config/app-data-source");
const Workout_1 = require("../entities/Workout");
const workoutRepository = app_data_source_1.AppDataSource.getRepository(Workout_1.Workout);
const getWorkouts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const workouts = yield workoutRepository.find();
    res.json(workouts);
});
exports.getWorkouts = getWorkouts;
const getWorkoutById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const workout = yield workoutRepository.findOneBy({ id: Number(id) });
    if (!workout) {
        return res.status(404).json({ message: 'Workout not found' });
    }
    res.json(workout);
});
exports.getWorkoutById = getWorkoutById;
const createWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newWorkout = workoutRepository.create(req.body);
    const result = yield workoutRepository.save(newWorkout);
    res.status(201).json(result);
});
exports.createWorkout = createWorkout;
const updateWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield workoutRepository.update(id, req.body);
    res.json({ message: 'Workout updated' });
});
exports.updateWorkout = updateWorkout;
const deleteWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield workoutRepository.delete(id);
    res.json({ message: 'Workout deleted' });
});
exports.deleteWorkout = deleteWorkout;
