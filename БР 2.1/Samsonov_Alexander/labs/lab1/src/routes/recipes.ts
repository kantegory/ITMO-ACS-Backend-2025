import {createCrudRouter} from './crudRouterFactory';
import {AppDataSource} from '../data-source';
import {Recipe} from "../models/Recipe";

/**
 * @openapi
 * tags:
 *   - name: Recipes
 *     description: Operations about recipes
 */

/**
 * @openapi
 * /api/recipes:
 *   get:
 *     tags:
 *       - Recipes
 *     summary: Get all recipes
 *     responses:
 *       200:
 *         description: A list of recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *   post:
 *     tags:
 *       - Recipes
 *     summary: Create a new recipe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       201:
 *         description: Recipe created
 */

/**
 * @openapi
 * /api/recipes/{id}:
 *   get:
 *     tags:
 *       - Recipes
 *     summary: Get a recipe by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A recipe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *   put:
 *     tags:
 *       - Recipes
 *     summary: Update a recipe by ID
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
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       200:
 *         description: Recipe updated
 *   delete:
 *     tags:
 *       - Recipes
 *     summary: Delete a recipe by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Recipe deleted
 */
const userRouter = createCrudRouter(AppDataSource, Recipe, '/recipes', ['id', 'title', 'description', 'ingredients', 'content', 'author', 'tags', 'likes']);

export default userRouter;
