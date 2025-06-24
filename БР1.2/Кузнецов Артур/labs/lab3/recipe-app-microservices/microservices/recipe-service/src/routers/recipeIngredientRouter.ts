import { Router } from 'express';
import {
    createRecipeIngredient,
    deleteRecipeIngredient,
    getRecipeIngredient,
    getRecipeIngredients,
    updateRecipeIngredient,
} from '../controllers/recipeIngredientController';
import { authMiddleware } from 'common-service/src/middleware/authMiddleware';

const router = Router();

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
router.get('/:recipeId', getRecipeIngredients);

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
router.post('/:recipeId', authMiddleware, createRecipeIngredient);

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
router.get('/:recipeId/:id', getRecipeIngredient);

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
router.put('/:recipeId/:id', authMiddleware, updateRecipeIngredient);

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
router.delete('/:recipeId/:id', authMiddleware, deleteRecipeIngredient);

export default router;
