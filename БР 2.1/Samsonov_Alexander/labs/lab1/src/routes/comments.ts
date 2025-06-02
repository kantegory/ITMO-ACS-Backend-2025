import {createCrudRouter} from './crudRouterFactory';
import {AppDataSource} from '../data-source';
import {Comment} from "../models/Comment";

/**
 * @openapi
 * tags:
 *   - name: Comments
 *     description: Operations about comments
 */

/**
 * @openapi
 * /api/comments:
 *   get:
 *     tags:
 *       - Comments
 *     summary: Get all comments
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *   post:
 *     tags:
 *       - Comments
 *     summary: Create a new comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Comment created
 */

/**
 * @openapi
 * /api/comments/{id}:
 *   get:
 *     tags:
 *       - Comments
 *     summary: Get a comment by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *   put:
 *     tags:
 *       - Comments
 *     summary: Update a comment by ID
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
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Comment updated
 *   delete:
 *     tags:
 *       - Comments
 *     summary: Delete a comment by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Comment deleted
 */
const userRouter = createCrudRouter(AppDataSource, Comment, '/comments', ['id', 'content', 'user', 'recipe', 'createdAt']);

export default userRouter;
