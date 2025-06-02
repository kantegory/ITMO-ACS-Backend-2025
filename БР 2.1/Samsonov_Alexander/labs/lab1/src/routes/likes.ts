import {createCrudRouter} from './crudRouterFactory';
import {AppDataSource} from '../data-source';
import {Like} from "../models/Like";


/**
 * @openapi
 * tags:
 *   - name: Likes
 *     description: Operations about likes
 */

/**
 * @openapi
 * /api/likes:
 *   get:
 *     tags:
 *       - Likes
 *     summary: Get all likes
 *     responses:
 *       200:
 *         description: A list of likes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Like'
 *   post:
 *     tags:
 *       - Likes
 *     summary: Create a new like
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Like'
 *     responses:
 *       201:
 *         description: Like created
 */

/**
 * @openapi
 * /api/likes/{id}:
 *   get:
 *     tags:
 *       - Likes
 *     summary: Get a like by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A like
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 *   put:
 *     tags:
 *       - Likes
 *     summary: Update a like by ID
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
 *             $ref: '#/components/schemas/Like'
 *     responses:
 *       200:
 *         description: Like updated
 *   delete:
 *     tags:
 *       - Likes
 *     summary: Delete a like by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Like deleted
 */
const userRouter = createCrudRouter(AppDataSource, Like, '/likes', ['id', 'user', 'recipe', 'createdAt']);

export default userRouter;
