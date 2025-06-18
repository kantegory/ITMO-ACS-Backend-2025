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
exports.initializeRecipeDifficulties = void 0;
const database_1 = require("../config/database");
const RecipeDifficulty_1 = require("../models/RecipeDifficulty");
const initializeRecipeDifficulties = () => __awaiter(void 0, void 0, void 0, function* () {
    const difficultyRepo = database_1.AppDataSource.getRepository(RecipeDifficulty_1.RecipeDifficulty);
    const difficulties = ['Легко', 'Нормально', 'Сложно'];
    const existingDifficulties = yield difficultyRepo.find();
    const missingDifficulties = difficulties.filter(name => !existingDifficulties.some(d => d.name === name));
    if (missingDifficulties.length > 0) {
        const newDifficulties = missingDifficulties.map(name => {
            const diff = new RecipeDifficulty_1.RecipeDifficulty();
            diff.name = name;
            return diff;
        });
        yield difficultyRepo.save(newDifficulties);
        console.log(`Initialized difficulties: ${missingDifficulties.join(', ')}`);
    }
    else {
        console.log('Difficulties already initialized.');
    }
});
exports.initializeRecipeDifficulties = initializeRecipeDifficulties;
