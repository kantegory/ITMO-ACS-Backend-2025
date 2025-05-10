import { Router } from "express";
import { Request, Response } from "express";
import { Recipe } from "../entities/Recipe";
import { dataSource } from "../dataSource";
import { RecipeStep } from "../entities/RecipeStep";
import { checkJwt } from "../middleware/validateJWT";

const recipeStepRouter = Router();

const recipeRepository = dataSource.getRepository(Recipe);
const recipeStepRepository = dataSource.getRepository(RecipeStep);

/**
 * @swagger
 * components:
 *   schemas:
 *     RecipeStep:
 *       type: object
 *       properties:
 *         recipe_step_id:
 *           type: integer
 *         step_number:
 *           type: integer
 *         instruction:
 *           type: string
 *         recipe:
 *           type: object
 *           properties:
 *             recipe_id:
 *               type: integer
 *             title:
 *               type: string
 *             description:
 *               type: string
 *         image:
 *           type: string
 *         video:
 *           type: string
 *       required:
 *         - step_number
 *         - description
 *         - recipe
 */

/**
 * @swagger
 * /recipe-steps:
 *   post:
 *     summary: Создать новый шаг для рецепта
 *     tags: [RecipeSteps]
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
 *               - step_number
 *               - instruction
 *             properties:
 *               recipeId:
 *                 type: integer
 *               step_number:
 *                 type: integer
 *               instruction:
 *                 type: string
 *     responses:
 *       200:
 *         description: Шаг рецепта успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeStep'
 *       404:
 *         description: Рецепт не найден
 *       401:
 *         description: Неавторизован
 */
recipeStepRouter.post("/", [checkJwt], async function (req: Request, res: Response) {
    const { recipeId } = req.body;
    const recipe = await recipeRepository.findOneBy({recipe_id: recipeId});
    if (!recipe) {
        res.status(404).json({detail: `Recipe with id ${recipeId} not found`});
    }
    const recipeStep = recipeStepRepository.create({...req.body, recipe});
    const results = await recipeStepRepository.save(recipeStep);
    res.send(results);
});

/**
 * @swagger
 * /recipe-steps/{id}:
 *   get:
 *     summary: Получить шаг рецепта по ID
 *     tags: [RecipeSteps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Шаг рецепта найден
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeStep'
 *       404:
 *         description: Шаг рецепта не найден
 *       401:
 *         description: Неавторизован
 */
recipeStepRouter.get("/:id", [checkJwt], async function (req: Request, res: Response) {
    const recipeStepId = parseInt(req.params.id);
    const results = await recipeStepRepository.findOneBy({
        recipe_step_id: recipeStepId,
    });
    if (!results) {
        res.status(404).json({ detail: `Recipe step with id ${recipeStepId} not found` });
        return;
    }
    res.send(results);
});

/**
 * @swagger
 * /recipe-steps/{id}:
 *   put:
 *     summary: Обновить шаг рецепта по ID
 *     tags: [RecipeSteps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipeId:
 *                 type: integer
 *               step_number:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Шаг рецепта успешно обновлен
 *       404:
 *         description: Шаг рецепта не найден
 *       403:
 *         description: Нет прав для редактирования шага рецепта
 */
recipeStepRouter.put("/:id", [checkJwt], async function (req: Request, res: Response) {
    const recipeStepId = parseInt(req.params.id);
    const recipeStep = await recipeStepRepository.findOneBy({
        recipe_step_id: recipeStepId,
    });
    if (!recipeStep) {
        res.status(404).json({ detail: `Recipe step with id ${recipeStepId} not found` });
        return;
    }
    if (recipeStep.recipe.user.username !== res.locals.jwtPayload.username) {
        res.status(403).json({ detail: `You can not edit recipe step with id ${recipeStepId}` });
        return;
    }
    const {recipeId} = req.body;
    if (recipeId) {
        const recipe = await recipeRepository.findOneBy({recipe_id: recipeId});
        if (recipe) {
            req.body["recipe"] = recipe;
        }
    }

    recipeStepRepository.merge(recipeStep, req.body);
    const results = await recipeStepRepository.save(recipeStep);
    res.send(results);
});

/**
 * @swagger
 * /recipe-steps/{id}:
 *   delete:
 *     summary: Удалить шаг рецепта по ID
 *     tags: [RecipeSteps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Шаг рецепта успешно удален
 *       404:
 *         description: Шаг рецепта не найден
 *       403:
 *         description: Нет прав для удаления шага рецепта
 */
recipeStepRouter.delete("/:id", [checkJwt], async function (req: Request, res: Response) {
    const recipeStepId = parseInt(req.params.id);

    const recipeStep = await recipeStepRepository.findOneBy({
        recipe_step_id: recipeStepId,
    });
    if (!recipeStep) {
        res.status(404).json({ detail: `Recipe step with id ${recipeStepId} not found` });
        return;
    }
    if (recipeStep.recipe.user.username !== res.locals.jwtPayload.username) {
        res.status(403).json({ detail: `You can not delete recipe step with id ${recipeStepId}` });
        return;
    }

    const results = await recipeStepRepository.delete(recipeStepId);
    if (!results.affected || results.affected === 0) {
        res.status(404).json({ detail: `Recipe step with id ${recipeStepId} not found` });
        return;
    }
    res.send(results);
});

export default recipeStepRouter;
