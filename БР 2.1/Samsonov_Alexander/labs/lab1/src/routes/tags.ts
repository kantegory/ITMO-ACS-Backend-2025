import {createCrudRouter} from './crudRouterFactory';
import {AppDataSource} from '../data-source';
import {Tag} from "../models/Tag";

/**
 * @openapi
 * tags:
 *   - name: Tags
 *     description: Operations about tags
 */

/**
 * @openapi
 * /api/tags:
 *   get:
 *     tags:
 *       - Tags
 *     summary: Get all tags
 *     responses:
 *       200:
 *         description: A list of tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tag'
 *   post:
 *     tags:
 *       - Tags
 *     summary: Create a new tag
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tag'
 *     responses:
 *       201:
 *         description: Tag created
 */

/**
 * @openapi
 * /api/tags/{id}:
 *   get:
 *     tags:
 *       - Tags
 *     summary: Get a tag by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A tag
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *   put:
 *     tags:
 *       - Tags
 *     summary: Update a tag by ID
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
 *             $ref: '#/components/schemas/Tag'
 *     responses:
 *       200:
 *         description: Tag updated
 *   delete:
 *     tags:
 *       - Tags
 *     summary: Delete a tag by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Tag deleted
 */
const userRouter = createCrudRouter(AppDataSource, Tag, '/tags', ['id', 'name']);

export default userRouter;
