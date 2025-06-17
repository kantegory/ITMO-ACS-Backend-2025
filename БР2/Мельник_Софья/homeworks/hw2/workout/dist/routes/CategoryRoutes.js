"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoryController_1 = require("../controllers/CategoryController");
const categoryRouter = (0, express_1.Router)();
categoryRouter.get('/', CategoryController_1.getCategories);
categoryRouter.get('/:id', (req, res, next) => {
    (0, CategoryController_1.getCategoryById)(req, res).catch(next);
});
categoryRouter.post('/', CategoryController_1.createCategory);
categoryRouter.put('/:id', CategoryController_1.updateCategory);
categoryRouter.delete('/:id', CategoryController_1.deleteCategory);
exports.default = categoryRouter;
