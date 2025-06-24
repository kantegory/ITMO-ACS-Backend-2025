import { Router } from 'express';
import {
    createIngredient,
    deleteIngredient,
    getIngredient,
    getIngredients,
    updateIngredient,
} from '../controllers/ingredientController';
import { authMiddleware } from '../middleware/authMiddleware';
import { adminOnlyMiddleware } from '../middleware/adminOnlyMiddleware';

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Ingredient
 */

/**
 * @openapi
 * /ingredient/:
 *   get:
 *     tags:
 *       - Ingredient
 *     summary: Список ингредиентов
 *     responses:
 *       200:
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingredient'
 *       500:
 *         description: Internal Server Error
 */
router.get('/', getIngredients);

/**
 * @openapi
 * /ingredient/{id}:
 *   get:
 *     tags:
 *       - Ingredient
 *     summary: Ингредиент
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID ингредиента
 *     responses:
 *       200:
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', getIngredient);

/**
 * @openapi
 * /ingredient/:
 *   post:
 *     tags:
 *       - Ingredient
 *     summary: Создание ингредиента
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              required:
 *                - name
 *              properties:
 *                name:
 *                  type: string
 *     responses:
 *       201:
 *         description: Created Successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access Denied
 *       500:
 *         description: Internal Server Error
 */
router.post('/', authMiddleware, adminOnlyMiddleware, createIngredient);

/**
 * @openapi
 * /ingredient/{id}:
 *   put:
 *     tags:
 *       - Ingredient
 *     summary: Обновление ингредиента
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID ингредиента
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              required:
 *                - name
 *              properties:
 *                name:
 *                  type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access Denied
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', authMiddleware, adminOnlyMiddleware, updateIngredient);

/**
 * @openapi
 * /ingredient/{id}:
 *   delete:
 *     tags:
 *       - Ingredient
 *     summary: Удаление ингредиента
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID ингредиента
 *     responses:
 *       204:
 *         description: Deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access Denied
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', authMiddleware, adminOnlyMiddleware, deleteIngredient);

export default router;
