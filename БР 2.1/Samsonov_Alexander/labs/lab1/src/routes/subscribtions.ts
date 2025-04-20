import {createCrudRouter} from './crudRouterFactory';
import {AppDataSource} from '../data-source';
import {Subscription} from "../models/Subscribtion";

/**
 * @openapi
 * tags:
 *   - name: Subscriptions
 *     description: Operations about subscriptions
 */

/**
 * @openapi
 * /api/subscriptions:
 *   get:
 *     tags:
 *       - Subscriptions
 *     summary: Get all subscriptions
 *     responses:
 *       200:
 *         description: A list of subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscription'
 *   post:
 *     tags:
 *       - Subscriptions
 *     summary: Create a new subscription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscription'
 *     responses:
 *       201:
 *         description: Subscription created
 */

/**
 * @openapi
 * /api/subscriptions/{id}:
 *   get:
 *     tags:
 *       - Subscriptions
 *     summary: Get a subscription by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A subscription
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *   put:
 *     tags:
 *       - Subscriptions
 *     summary: Update a subscription by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscription'
 *     responses:
 *       200:
 *         description: Subscription updated
 *   delete:
 *     tags:
 *       - Subscriptions
 *     summary: Delete a subscription by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Subscription deleted
 */
const subscriptionRouter = createCrudRouter(AppDataSource, Subscription, '/subscriptions', ['id', 'subscriber', 'creator', 'createdAt']);

export default subscriptionRouter;
