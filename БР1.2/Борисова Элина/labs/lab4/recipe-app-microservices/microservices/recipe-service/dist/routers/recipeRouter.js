"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipeController_1 = require("../controllers/recipeController");
const authMiddleware_1 = require("common-service/src/middleware/authMiddleware");
const router = (0, express_1.Router)();
/**
 * @openapi
 * tags:
 *   - name: Recipe
 */
/**
 * @openapi
 * /recipe:
 *   get:
 *     tags:
 *       - Recipe
 *     summary: Список рецептов
 *     parameters:
 *       - in: query
 *         name: dishTypeId
 *         schema:
 *           type: integer
 *         description: Фильтр по ID типа блюда
 *       - in: query
 *         name: difficultyId
 *         schema:
 *           type: integer
 *         description: Фильтр по ID уровню сложности рецепта
 *       - in: query
 *         name: ingredientIds
 *         schema:
 *           type: string
 *         description: Фильтр по списку ID ингредиентов
 *     responses:
 *       200:
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       500:
 *         description: Internal Server Error
 */
router.get('/', recipeController_1.getRecipes);
/**
 * @openapi
 * /recipe:
 *   post:
 *     tags:
 *       - Recipe
 *     summary: Создать рецепт
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - dishTypeId
 *               - recipeDifficultyId
 *               - title
 *               - preparation_time
 *               - cooking_time
 *               - servings
 *             properties:
 *               dishTypeId:
 *                 type: integer
 *               recipeDifficultyId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               preparation_time:
 *                 type: integer
 *               cooking_time:
 *                 type: integer
 *               servings:
 *                 type: integer
 *               image:
 *                 type: string
 *               video:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created Successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       400:
 *         description: Invalid Input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.post('/', authMiddleware_1.authMiddleware, recipeController_1.createRecipe);
/**
 * @openapi
 * /recipe/mine:
 *   get:
 *     tags:
 *       - Recipe
 *     summary: Мои рецепты
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/mine', authMiddleware_1.authMiddleware, recipeController_1.getOwnRecipes);
/**
 * @openapi
 * /recipe/user/{userId}:
 *   get:
 *     tags:
 *       - Recipe
 *     summary: Рецепты пользователя
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error=
 */
router.get('/user/:userId', recipeController_1.getRecipesByUser);
/**
 * @openapi
 * /recipe/{id}:
 *   get:
 *     tags:
 *       - Recipe
 *     summary: Рецепт
 *     parameters:
 *       - in: path
 *         name: id
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
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', recipeController_1.getRecipe);
/**
 * @openapi
 * /recipe/{id}:
 *   put:
 *     tags:
 *       - Recipe
 *     summary: Обновить рецепт
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID рецепта
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dishTypeId:
 *                 type: integer
 *               recipeDifficultyId:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               preparation_time:
 *                 type: integer
 *               cooking_time:
 *                 type: integer
 *               servings:
 *                 type: integer
 *               image:
 *                 type: string
 *               video:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated Successfully
 *       400:
 *         description: Invalid Input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access Denied
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', authMiddleware_1.authMiddleware, recipeController_1.updateRecipe);
/**
 * @openapi
 * /recipe/{id}:
 *   delete:
 *     tags:
 *       - Recipe
 *     summary: Удалить рецепт
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID рецепта
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
router.delete('/:id', authMiddleware_1.authMiddleware, recipeController_1.deleteRecipe);
exports.default = router;
