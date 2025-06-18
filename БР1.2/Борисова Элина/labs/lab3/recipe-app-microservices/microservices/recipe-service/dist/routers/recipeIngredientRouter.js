"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipeIngredientController_1 = require("../controllers/recipeIngredientController");
const authMiddleware_1 = require("common-service/src/middleware/authMiddleware");
const router = (0, express_1.Router)();
/**
 * @openapi
 * tags:
 *   - name: RecipeIngredient
 */
/**
 * @openapi
 * /recipe-ingredient/{recipeId}:
 *   get:
 *     tags:
 *       - RecipeIngredient
 *     summary: Список ингредиентов в рецепте
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID рецепта
 *     responses:
 *       200:
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RecipeIngredient'
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:recipeId', recipeIngredientController_1.getRecipeIngredients);
/**
 * @openapi
 * /recipe-ingredient/{recipeId}:
 *   post:
 *     tags:
 *       - RecipeIngredient
 *     summary: Добавить ингредиент в рецепт
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ingredientId
 *               - quantity
 *               - unit
 *             properties:
 *               ingredientId:
 *                 type: integer
 *               quantity:
 *                 type: number
 *                 format: float
 *               unit:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created Successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeIngredient'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.post('/:recipeId', authMiddleware_1.authMiddleware, recipeIngredientController_1.createRecipeIngredient);
/**
 * @openapi
 * /recipe-ingredient/{recipeId}/{id}:
 *   get:
 *     tags:
 *       - RecipeIngredient
 *     summary: Ингредиент рецепта
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeIngredient'
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:recipeId/:id', recipeIngredientController_1.getRecipeIngredient);
/**
 * @openapi
 * /recipe-ingredient/{recipeId}/{id}:
 *   put:
 *     tags:
 *       - RecipeIngredient
 *     summary: Обновить ингредиент рецепта
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ingredientId:
 *                 type: integer
 *               quantity:
 *                 type: number
 *                 format: float
 *               unit:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated Successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access Denied
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:recipeId/:id', authMiddleware_1.authMiddleware, recipeIngredientController_1.updateRecipeIngredient);
/**
 * @openapi
 * /recipe-ingredient/{recipeId}/{id}:
 *   delete:
 *     tags:
 *       - RecipeIngredient
 *     summary: Удалить ингредиент из рецепта
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Deleted Successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access Denied
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:recipeId/:id', authMiddleware_1.authMiddleware, recipeIngredientController_1.deleteRecipeIngredient);
exports.default = router;
