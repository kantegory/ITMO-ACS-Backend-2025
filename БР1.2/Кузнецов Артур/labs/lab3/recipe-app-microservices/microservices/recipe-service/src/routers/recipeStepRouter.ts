import { Router } from 'express';
import {
    createRecipeStep,
    deleteRecipeStep,
    getRecipeStep,
    getRecipeSteps,
    updateRecipeStep,
} from '../controllers/recipeStepController';
import { authMiddleware } from 'common-service/src/middleware/authMiddleware';

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: RecipeStep
 */

/**
 * @openapi
 * /recipe-step/{recipeId}:
 *   get:
 *     tags:
 *       - RecipeStep
 *     summary: Список шагов рецепта
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
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   step_number:
 *                     type: integer
 *                   instruction:
 *                     type: string
 *                   image:
 *                     type: string
 *                     nullable: true
 *                   recipe:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:recipeId', getRecipeSteps);

/**
 * @openapi
 * /recipe-step/{recipeId}/{stepNumber}:
 *   get:
 *     tags:
 *       - RecipeStep
 *     summary: Шаг рецепта
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID рецепта
 *       - in: path
 *         name: stepNumber
 *         required: true
 *         schema:
 *           type: integer
 *         description: Номер шага рецепта
 *     responses:
 *       200:
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 step_number:
 *                   type: integer
 *                 instruction:
 *                   type: string
 *                 image:
 *                   type: string
 *                   nullable: true
 *                 recipe:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     title:
 *                       type: string
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:recipeId/:stepNumber', getRecipeStep);

/**
 * @openapi
 * /recipe-step/{recipeId}/:
 *   post:
 *     tags:
 *       - RecipeStep
 *     summary: Создать шаг рецепта
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
 *               - step_number
 *               - instruction
 *             properties:
 *               step_number:
 *                 type: integer
 *               instruction:
 *                 type: string
 *               image:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Created Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 step_number:
 *                   type: integer
 *                 instruction:
 *                   type: string
 *                 image:
 *                   type: string
 *                   nullable: true
 *                 recipe:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     title:
 *                       type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.post('/:recipeId', authMiddleware, createRecipeStep);

/**
 * @openapi
 * /recipe-step/{recipeId}/{stepNumber}:
 *   put:
 *     tags:
 *       - RecipeStep
 *     summary: Обновить шаг рецепта
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID рецепта
 *       - in: path
 *         name: stepNumber
 *         required: true
 *         schema:
 *           type: integer
 *         description: Номер шага рецепта
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               step_number:
 *                 type: integer
 *               instruction:
 *                 type: string
 *               image:
 *                 type: string
 *                 nullable: true
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
router.put('/:recipeId/:stepNumber', authMiddleware, updateRecipeStep);

/**
 * @openapi
 * /recipe-step/{recipeId}/{stepNumber}:
 *   delete:
 *     tags:
 *       - RecipeStep
 *     summary: Удалить шаг рецепта
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID рецепта
 *       - in: path
 *         name: stepNumber
 *         required: true
 *         schema:
 *           type: integer
 *         description: Номер шага рецепта
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
router.delete('/:recipeId/:stepNumber', authMiddleware, deleteRecipeStep);

export default router;
