import { Router } from "express";
import {
    getAllRecipeCategories,
    createRecipeCategory,
    deleteRecipeCategory
} from "../controllers/recipeCategories.controller";

const router = Router();

/**
 * @openapi
 * /recipe-categories:
 *   get:
 *     summary: Получить все связи рецептов с категориями
 *     tags:
 *       - RecipeCategories
 *     responses:
 *       200:
 *         description: Список всех связей рецепт-категория
 */
router.get("/", getAllRecipeCategories);

/**
 * @openapi
 * /recipe-categories:
 *   post:
 *     summary: Добавить категорию к рецепту
 *     tags:
 *       - RecipeCategories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipeId:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Категория успешно добавлена к рецепту
 */
router.post("/", createRecipeCategory);

/**
 * @openapi
 * /recipe-categories/{recipe_id}/{category_id}:
 *   delete:
 *     summary: Удалить категорию из рецепта
 *     tags:
 *       - RecipeCategories
 *     parameters:
 *       - in: path
 *         name: recipe_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: category_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Категория удалена из рецепта
 *       404:
 *         description: Связь не найдена
 */
router.delete("/:recipe_id/:category_id", deleteRecipeCategory);

export default router;