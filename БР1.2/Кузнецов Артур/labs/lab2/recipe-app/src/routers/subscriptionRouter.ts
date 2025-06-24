import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { adminOnlyMiddleware } from '../middleware/adminOnlyMiddleware';
import {
    createSubscription,
    deleteSubscription,
    getFollowersOf,
    getFollowingOf,
    getOwnFollowers,
    getOwnFollowing,
    getSubscription,
    getSubscriptions,
} from '../controllers/subscriptionController';

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Subscription
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     SubscriptionResponse:
 *       type: object
 *       required:
 *         - id
 *         - created_at
 *         - follower
 *         - following
 *       properties:
 *         id:
 *           type: integer
 *         created_at:
 *           type: string
 *           format: date-time
 *         follower:
 *           type: object
 *           required:
 *             - id
 *             - first_name
 *             - last_name
 *           properties:
 *             id:
 *               type: integer
 *             first_name:
 *               type: string
 *             last_name:
 *               type: string
 *         following:
 *           type: object
 *           required:
 *             - id
 *             - first_name
 *             - last_name
 *           properties:
 *             id:
 *               type: integer
 *             first_name:
 *               type: string
 *             last_name:
 *               type: string
 */

/**
 * @openapi
 * /subscription:
 *   post:
 *     tags:
 *       - Subscription
 *     summary: Создать подписку
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - followingId
 *             properties:
 *               followerId:
 *                 type: integer
 *               followingId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created Successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubscriptionResponse'
 *       400:
 *         description: You can not subscribe to yourself
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.post('/', authMiddleware, createSubscription);

/**
 * @openapi
 * /subscription/all:
 *   get:
 *     tags:
 *       - Subscription
 *     summary: Все подписки
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
 *                 $ref: '#/components/schemas/SubscriptionResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access Denied
 *       500:
 *         description: Internal Server Error
 */
router.get('/all', authMiddleware, adminOnlyMiddleware, getSubscriptions);

/**
 * @openapi
 * /subscription/following/{userId}:
 *   get:
 *     tags:
 *       - Subscription
 *     summary: Подписки пользователя
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
 *                 $ref: '#/components/schemas/SubscriptionResponse'
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get('/following/:userId', getFollowingOf);

/**
 * @openapi
 * /subscription/followers/{userId}:
 *   get:
 *     tags:
 *       - Subscription
 *     summary: Подписчики пользователя
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
 *                 $ref: '#/components/schemas/SubscriptionResponse'
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get('/followers/:userId', getFollowersOf);

/**
 * @openapi
 * /subscription/mine/following:
 *   get:
 *     tags:
 *       - Subscription
 *     summary: Мои подписки
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
 *                 $ref: '#/components/schemas/SubscriptionResponse'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/mine/following', authMiddleware, getOwnFollowing);

/**
 * @openapi
 * /subscription/mine/followers:
 *   get:
 *     tags:
 *       - Subscription
 *     summary: Мои подписчики
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
 *                 $ref: '#/components/schemas/SubscriptionResponse'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/mine/followers', authMiddleware, getOwnFollowers);

/**
 * @openapi
 * /subscription/{id}:
 *   get:
 *     tags:
 *       - Subscription
 *     summary: Подписка
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID подписки
 *     responses:
 *       200:
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubscriptionResponse'
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', getSubscription);

/**
 * @openapi
 * /subscription/{id}:
 *   delete:
 *     tags:
 *       - Subscription
 *     summary: Удалить подписку
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID подписки
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
router.delete('/:id', authMiddleware, deleteSubscription);

export default router;
