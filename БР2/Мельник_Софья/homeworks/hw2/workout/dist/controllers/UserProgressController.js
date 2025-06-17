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
exports.deleteUserProgress = exports.updateUserProgress = exports.createUserProgress = exports.getUserProgressById = exports.getUserProgresses = void 0;
const app_data_source_1 = require("../config/app-data-source");
const UserProgress_1 = require("../entities/UserProgress");
const userProgressRepository = app_data_source_1.AppDataSource.getRepository(UserProgress_1.UserProgress);
const getUserProgresses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const progresses = yield userProgressRepository.find();
    res.json(progresses);
});
exports.getUserProgresses = getUserProgresses;
const getUserProgressById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const progress = yield userProgressRepository.findOneBy({ id: Number(id) });
    if (!progress) {
        return res.status(404).json({ message: 'User progress not found' });
    }
    res.json(progress);
});
exports.getUserProgressById = getUserProgressById;
const createUserProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProgress = userProgressRepository.create(req.body);
    const result = yield userProgressRepository.save(newProgress);
    res.status(201).json(result);
});
exports.createUserProgress = createUserProgress;
const updateUserProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield userProgressRepository.update(id, req.body);
    res.json({ message: 'User progress updated' });
});
exports.updateUserProgress = updateUserProgress;
const deleteUserProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield userProgressRepository.delete(id);
    res.json({ message: 'User progress deleted' });
});
exports.deleteUserProgress = deleteUserProgress;
