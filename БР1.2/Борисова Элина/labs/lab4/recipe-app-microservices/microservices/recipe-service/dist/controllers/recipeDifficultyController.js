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
exports.deleteRecipeDifficulty = exports.updateRecipeDifficulty = exports.getRecipeDifficulty = exports.getRecipeDifficulties = exports.createRecipeDifficulty = void 0;
const database_1 = require("../config/database");
const RecipeDifficulty_1 = require("../models/RecipeDifficulty");
const recipeDifficultyRepository = database_1.AppDataSource.getRepository(RecipeDifficulty_1.RecipeDifficulty);
const createRecipeDifficulty = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const difficulty = recipeDifficultyRepository.create(req.body);
        const saved = yield recipeDifficultyRepository.save(difficulty);
        res.status(201).json(saved);
    });
};
exports.createRecipeDifficulty = createRecipeDifficulty;
const getRecipeDifficulties = function (_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const list = yield recipeDifficultyRepository.find();
        res.json(list);
    });
};
exports.getRecipeDifficulties = getRecipeDifficulties;
const getRecipeDifficulty = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const item = yield recipeDifficultyRepository.findOneBy({ id });
        if (!item) {
            res.status(404).json({ message: 'RecipeDifficulty not found' });
            return;
        }
        res.json(item);
    });
};
exports.getRecipeDifficulty = getRecipeDifficulty;
const updateRecipeDifficulty = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const result = yield recipeDifficultyRepository.update(id, req.body);
        if (result.affected === 0) {
            res.status(404).json({ message: 'RecipeDifficulty not found' });
            return;
        }
        res.json({ message: 'RecipeDifficulty updated successfully' });
    });
};
exports.updateRecipeDifficulty = updateRecipeDifficulty;
const deleteRecipeDifficulty = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const result = yield recipeDifficultyRepository.delete(id);
        if (result.affected === 0) {
            res.status(404).json({ message: 'RecipeDifficulty not found' });
            return;
        }
        res.status(204).send();
    });
};
exports.deleteRecipeDifficulty = deleteRecipeDifficulty;
