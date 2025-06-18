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
exports.initializeDishTypes = void 0;
const database_1 = require("../config/database");
const DishType_1 = require("../models/DishType");
const initializeDishTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    const dishTypeRepo = database_1.AppDataSource.getRepository(DishType_1.DishType);
    const dishTypes = ['Закуски', 'Первые блюда', 'Вторые блюда', 'Салаты', 'Десерты', 'Напитки'];
    const existingDishTypes = yield dishTypeRepo.find();
    const missingDishTypes = dishTypes.filter(name => !existingDishTypes.some(dt => dt.name === name));
    if (missingDishTypes.length > 0) {
        const newDishTypes = missingDishTypes.map(name => {
            const type = new DishType_1.DishType();
            type.name = name;
            return type;
        });
        yield dishTypeRepo.save(newDishTypes);
        console.log(`Initialized dish types: ${missingDishTypes.join(', ')}`);
    }
    else {
        console.log('Dish types already initialized.');
    }
});
exports.initializeDishTypes = initializeDishTypes;
