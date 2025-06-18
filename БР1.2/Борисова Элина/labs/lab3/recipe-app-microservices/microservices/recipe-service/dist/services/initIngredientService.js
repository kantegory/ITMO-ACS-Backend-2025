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
exports.initializeIngredients = void 0;
const database_1 = require("../config/database");
const Ingredient_1 = require("../models/Ingredient");
const initializeIngredients = () => __awaiter(void 0, void 0, void 0, function* () {
    const ingredientRepo = database_1.AppDataSource.getRepository(Ingredient_1.Ingredient);
    const ingredients = [
        'Соль', 'Сахар', 'Перец черный', 'Мука пшеничная', 'Яйцо куриное', 'Молоко', 'Масло растительное',
        'Масло сливочное', 'Курица', 'Говядина', 'Свинина', 'Рыба', 'Лук репчатый', 'Чеснок', 'Помидор',
        'Огурец', 'Морковь', 'Картофель', 'Капуста', 'Перец болгарский', 'Фасоль', 'Горошек зелёный',
        'Кукуруза консервированная', 'Макароны', 'Рис', 'Гречка', 'Сметана', 'Майонез', 'Томатная паста',
        'Сыр твёрдый', 'Колбаса', 'Хлеб', 'Булгур', 'Йогурт', 'Лимон', 'Укроп', 'Петрушка', 'Базилик',
        'Орегано', 'Корица', 'Ваниль', 'Мёд', 'Грибы', 'Куриные бедра', 'Филе куриное', 'Креветки',
        'Оливковое масло', 'Соевый соус', 'Кетчуп', 'Миндаль',
    ];
    const existing = yield ingredientRepo.find();
    const missing = ingredients.filter(name => !existing.some(ing => ing.name.toLowerCase() === name.toLowerCase()));
    if (missing.length > 0) {
        const toSave = missing.map(name => {
            const ingredient = new Ingredient_1.Ingredient();
            ingredient.name = name;
            return ingredient;
        });
        yield ingredientRepo.save(toSave);
        console.log(`Initialized ingredients: ${missing.join(', ')}`);
    }
    else {
        console.log('Ingredients already initialized.');
    }
});
exports.initializeIngredients = initializeIngredients;
