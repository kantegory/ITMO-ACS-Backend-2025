import { Router } from "express";
import * as RecipeController from "../controllers/recipes.controller";

const router = Router();

/**
 * @openapi
 * /recipes:
 *   post:
 *     summary: Создать новый рецепт
 *     tags:
 *       - Recipes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               difficulty:
 *                 type: integer
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     quantity:
 *                       type: string
 *     responses:
 *       201:
 *         description: Рецепт успешно создан
 */
router.post("/", RecipeController.createRecipe);

/**
 * @openapi
 * /recipes:
 *   get:
 *     summary: Получить все рецепты
 *     tags:
 *       - Recipes
 *     responses:
 *       200:
 *         description: Список всех рецептов
 */
router.get("/", RecipeController.getAllRecipes);

/**
 * @openapi
 * /recipes/{id}:
 *   get:
 *     summary: Получить рецепт по ID
 *     tags:
 *       - Recipes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Найденный рецепт
 *       404:
 *         description: Рецепт не найден
 */
router.get("/:id", RecipeController.getRecipeById);

/**
 * @openapi
 * /recipes/{id}:
 *   put:
 *     summary: Обновить рецепт по ID
 *     tags:
 *       - Recipes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               difficulty:
 *                 type: integer
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     quantity:
 *                       type: string
 *     responses:
 *       200:
 *         description: Рецепт успешно обновлён
 *       404:
 *         description: Рецепт не найден
 */
router.put("/:id", RecipeController.updateRecipe);

/**
 * @openapi
 * /recipes/{id}:
 *   delete:
 *     summary: Удалить рецепт по ID
 *     tags:
 *       - Recipes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Рецепт удалён
 *       404:
 *         description: Рецепт не найден
 */
router.delete("/:id", RecipeController.deleteRecipe);

export default router;