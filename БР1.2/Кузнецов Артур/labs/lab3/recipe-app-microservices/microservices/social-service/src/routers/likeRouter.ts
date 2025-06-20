import { Router } from 'express';
import {
    createLike,
    deleteLike,
    getLike,
    getLikes,
    getLikesByRecipe,
    getLikesByUser,
    getOwnLikes,
} from '../controllers/likeController';
import { authMiddleware } from 'common-service/src/middleware/authMiddleware';
import { adminOnlyMiddleware } from 'common-service/src/middleware/adminOnlyMiddleware';

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Like
 */

/**
 * @openapi
 * /like:
 *   post:
 *     tags:
 *       - Like
 *     summary: Создать лайк
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipeId
 *             properties:
 *               recipeId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created Successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 *       400:
 *         description: Invalid Input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.post('/', authMiddleware, createLike);

/**
 * @openapi
 * /like/mine:
 *   get:
 *     tags:
 *       - Like
 *     summary: Мои лайки
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
 *                 $ref: '#/components/schemas/Like'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/mine', authMiddleware, getOwnLikes);

/**
 * @openapi
 * /like/all:
 *   get:
 *     tags:
 *       - Like
 *     summary: Все лайки
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
 *                 $ref: '#/components/schemas/Like'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access Denied
 *       500:
 *         description: Internal Server Error
 */
router.get('/all', authMiddleware, adminOnlyMiddleware, getLikes);

/**
 * @openapi
 * /like/{id}:
 *   get:
 *     tags:
 *       - Like
 *     summary: Лайк
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID лайка
 *     responses:
 *       200:
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access Denied
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', authMiddleware, adminOnlyMiddleware, getLike);

/**
 * @openapi
 * /like/{id}:
 *   delete:
 *     tags:
 *       - Like
 *     summary: Удалить лайк
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID лайка
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
router.delete('/:id', authMiddleware, deleteLike);

/**
 * @openapi
 * /like/recipe/{recipeId}:
 *   get:
 *     tags:
 *       - Like
 *     summary: Лайки для рецепта
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
 *                 $ref: '#/components/schemas/Like'
 *       400:
 *         description: Invalid Input
 *       500:
 *         description: Internal Server Error
 */
router.get('/recipe/:recipeId', getLikesByRecipe);

/**
 * @openapi
 * /like/user/{userId}:
 *   get:
 *     tags:
 *       - Like
 *     summary: Лайки пользователя
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
 *                 $ref: '#/components/schemas/Like'
 *       400:
 *         description: Invalid Input
 *       500:
 *         description: Internal Server Error
 */
router.get('/user/:userId', getLikesByUser);

export default router;
