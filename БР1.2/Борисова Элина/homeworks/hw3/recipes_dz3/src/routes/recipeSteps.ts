import { Router } from "express";
import * as RecipeStepController from "../controllers/recipeSteps.controller";

const router = Router();

/**
 * @openapi
 * /recipe-steps:
 *   post:
 *     summary: Создать шаг рецепта
 *     tags:
 *       - RecipeSteps
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipe_id:
 *                 type: string
 *               step_number:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Шаг успешно создан
 */
router.post("/", RecipeStepController.createRecipeStep);

/**
 * @openapi
 * /recipe-steps/recipe/{recipeId}:
 *   get:
 *     summary: Получить шаги рецепта по ID рецепта
 *     tags:
 *       - RecipeSteps
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Список шагов рецепта
 *       404:
 *         description: Рецепт не найден
 */
router.get("/recipe/:recipeId", RecipeStepController.getStepsByRecipe);

/**
 * @openapi
 * /recipe-steps/{id}:
 *   put:
 *     summary: Обновить шаг рецепта по ID
 *     tags:
 *       - RecipeSteps
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
 *               step_number:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Шаг обновлён
 *       404:
 *         description: Шаг не найден
 */
router.put("/:id", RecipeStepController.updateRecipeStep);

/**
 * @openapi
 * /recipe-steps/{id}:
 *   delete:
 *     summary: Удалить шаг рецепта по ID
 *     tags:
 *       - RecipeSteps
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Шаг удалён
 *       404:
 *         description: Шаг не найден
 */
router.delete("/:id", RecipeStepController.deleteRecipeStep);

export default router;