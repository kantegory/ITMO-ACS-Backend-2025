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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getCategories = void 0;
const app_data_source_1 = require("../config/app-data-source");
const Category_1 = require("../entities/Category");
const categoryRepository = app_data_source_1.AppDataSource.getRepository(Category_1.Category);
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield categoryRepository.find();
    res.json(categories);
});
exports.getCategories = getCategories;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield categoryRepository.findOneBy({ id: Number(id) });
    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
});
exports.getCategoryById = getCategoryById;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCategory = categoryRepository.create(req.body);
    const result = yield categoryRepository.save(newCategory);
    res.status(201).json(result);
});
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield categoryRepository.update(id, req.body);
    res.json({ message: 'Category updated' });
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield categoryRepository.delete(id);
    res.json({ message: 'Category deleted' });
});
exports.deleteCategory = deleteCategory;
