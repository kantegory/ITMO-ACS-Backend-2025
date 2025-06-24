import { Router } from 'express';
import {
    createRecipeDifficulty,
    deleteRecipeDifficulty,
    getRecipeDifficulties,
    getRecipeDifficulty,
    updateRecipeDifficulty,
} from '../controllers/recipeDifficultyController';
import { authMiddleware } from '../middleware/authMiddleware';
import { adminOnlyMiddleware } from '../middleware/adminOnlyMiddleware';

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: RecipeDifficulty
 */

/**
 * @openapi
 * /recipe-difficulty/:
 *   get:
 *     tags:
 *       - RecipeDifficulty
 *     summary: Список уровней сложности рецептов
 *     responses:
 *       200:
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RecipeDifficulty'
 *       500:
 *         description: Internal Server Error
 */
router.get('/', getRecipeDifficulties);

/**
 * @openapi
 * /recipe-difficulty/{id}:
 *   get:
 *     tags:
 *       - RecipeDifficulty
 *     summary: Уровень сложности рецепта
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID уровня сложности рецепта
 *     responses:
 *       200:
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeDifficulty'
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', getRecipeDifficulty);

/**
 * @openapi
 * /recipe-difficulty/:
 *   post:
 *     tags:
 *       - RecipeDifficulty
 *     summary: Создать уровень сложности рецепта
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
 *               $ref: '#/components/schemas/RecipeDifficulty'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access Denied
 *       500:
 *         description: Internal Server Error
 */
router.post('/', authMiddleware, adminOnlyMiddleware, createRecipeDifficulty);

/**
 * @openapi
 * /recipe-difficulty/{id}:
 *   put:
 *     tags:
 *       - RecipeDifficulty
 *     summary: Обновить уровень сложности рецепта
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID уровня сложности рецепта
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
router.put('/:id', authMiddleware, adminOnlyMiddleware, updateRecipeDifficulty);

/**
 * @openapi
 * /recipe-difficulty/{id}:
 *   delete:
 *     tags:
 *       - RecipeDifficulty
 *     summary: Удалить уровень сложности рецепта
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID уровня сложности рецепта
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
router.delete('/:id', authMiddleware, adminOnlyMiddleware, deleteRecipeDifficulty);

export default router;
