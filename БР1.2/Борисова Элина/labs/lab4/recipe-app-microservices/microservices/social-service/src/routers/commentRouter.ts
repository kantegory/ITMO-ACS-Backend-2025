import { Router } from 'express';
import {
    createComment,
    deleteComment,
    getCommentsByRecipe,
    getCommentsByUser,
    getOwnComments,
    updateComment,
} from '../controllers/commentController';
import {authMiddleware} from "../middleware/authMiddleware";
import {adminOnlyMiddleware} from "../middleware/adminOnlyMiddleware";

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Comment
 */

/**
 * @openapi
 * /comment/{recipeId}:
 *   post:
 *     tags:
 *       - Comment
 *     summary: Создать комментарий
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
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
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created Successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Invalid Input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.post('/:recipeId', authMiddleware, createComment);

/**
 * @openapi
 * /comment/{recipeId}:
 *   get:
 *     tags:
 *       - Comment
 *     summary: Комментарии к рецепту
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
 *                 $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Invalid Input
 *       500:
 *         description: Internal Server Error
 */
router.get('/:recipeId', getCommentsByRecipe);

/**
 * @openapi
 * /comment/{id}:
 *   put:
 *     tags:
 *       - Comment
 *     summary: Обновить комментарий
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID комментария
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               userId:
 *                 type: integer
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
router.put('/:id', authMiddleware, updateComment);

/**
 * @openapi
 * /comment/{id}:
 *   delete:
 *     tags:
 *       - Comment
 *     summary: Удалить комментарий
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID комментария
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
router.delete('/:id', authMiddleware, deleteComment);

export default router;