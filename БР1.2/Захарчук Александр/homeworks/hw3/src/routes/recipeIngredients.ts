import { Router } from "express";
import { Request, Response } from "express";
import { Ingredient } from "../entities/Ingredient";
import { dataSource } from "../dataSource";
import { Recipe } from "../entities/Recipe";
import { RecipeIngredient } from "../entities/RecipeToIngredient";
import { checkJwt } from "../middleware/validateJWT";

const recipeIngredientRouter = Router();

const recipeRepository = dataSource.getRepository(Recipe);
const ingredientRepository = dataSource.getRepository(Ingredient);
const recipeIngredientRepository = dataSource.getRepository(RecipeIngredient);

/**
 * @swagger
 * tags:
 *   name: RecipeIngredients
 *   description: API для управления ингредиентами рецептов
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RecipeIngredient:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         recipe:
 *           type: object
 *           properties:
 *             recipe_id:
 *               type: integer
 *             title:
 *               type: string
 *         ingredient:
 *           type: object
 *           properties:
 *             ingredient_id:
 *               type: integer
 *             name:
 *               type: string
 *         quantity:
 *           type: integer
 *         unit:
 *           type: string
 *           enum: [g, kg, ml, l, tsp, tbsp, cup, piece, slice, pinch, dash, drop, bunch, leaf, clove, can, bottle, package]
 */

/**
 * @swagger
 * /recipes-ingredients:
 *   post:
 *     summary: Добавить ингредиент в рецепт
 *     tags: [RecipeIngredients]
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
 *               - ingredientId
 *               - quantity
 *               - unit
 *             properties:
 *               recipeId:
 *                 type: integer
 *               ingredientId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               unit:
 *                 type: string
 *                 enum: [g, kg, ml, l, tsp, tbsp, cup, piece, slice, pinch, dash, drop, bunch, leaf, clove, can, bottle, package]
 *     responses:
 *       200:
 *         description: Ингредиент успешно добавлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeIngredient'
 *       404:
 *         description: Рецепт или ингредиент не найден
 *       401:
 *         description: Неавторизован
 */
recipeIngredientRouter.post("/", [checkJwt], async function (req: Request, res: Response) {
    const { recipeId, ingredientId, quantity, unit } = req.body;
    const recipe = await recipeRepository.findOneBy({
        recipe_id: parseInt(recipeId),
    });

    if (!recipe) {
        res.status(404).json({detail: `Recipe with id ${recipeId} not found`});
        return;
    }

    const ingredient = await ingredientRepository.findOneBy({
        ingredient_id: parseInt(ingredientId),
    });

    if (!ingredient) {
        res.status(404).json({detail: `Ingredient with id ${ingredientId} not found`});
        return;
    }

    const recipeIngredient = recipeIngredientRepository.create({
        recipe,
        ingredient,
        quantity,
        unit,
    });

    const results = await recipeIngredientRepository.save(recipeIngredient);
    res.send(results);
});

/**
 * @swagger
 * /recipes-ingredients:
 *   get:
 *     summary: Получить все ингредиенты рецептов
 *     tags: [RecipeIngredients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список ингредиентов рецептов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RecipeIngredient'
 *       401:
 *         description: Неавторизован
 */
recipeIngredientRouter.get("/", [checkJwt], async function (req: Request, res: Response) {
    const recipeIngredients = await recipeIngredientRepository.find();
    res.json(recipeIngredients);
});

/**
 * @swagger
 * /recipes-ingredients/{id}:
 *   get:
 *     summary: Получить ингредиент рецепта по ID
 *     tags: [RecipeIngredients]
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
 *         description: Ингредиент найден
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeIngredient'
 *       404:
 *         description: Ингредиент не найден
 */
recipeIngredientRouter.get("/:id", [checkJwt], async function (req: Request, res: Response) {
    const recipeIngredientId = parseInt(req.params.id);
    const results = await recipeIngredientRepository.findOneBy({
        id: recipeIngredientId,
    });
    if (!results) {
        res.status(404).json({ detail: `Recipe ingredient with id ${recipeIngredientId} not found` });
        return;
    }
    res.send(results);
});

/**
 * @swagger
 * /recipes-ingredients/{id}:
 *   put:
 *     summary: Обновить ингредиент рецепта по ID
 *     tags: [RecipeIngredients]
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
 *               ingredientId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               unit:
 *                 type: string
 *                 enum: [g, kg, ml, l, tsp, tbsp, cup, piece, slice, pinch, dash, drop, bunch, leaf, clove, can, bottle, package]
 *     responses:
 *       200:
 *         description: Ингредиент успешно обновлён
 *       403:
 *         description: Нет прав на редактирование
 *       404:
 *         description: Ингредиент не найден
 */
recipeIngredientRouter.put("/:id", [checkJwt], async function (req: Request, res: Response) {
    const recipeIngredientId = parseInt(req.params.id);
    const recipeIngredient = await recipeIngredientRepository.findOneBy({
        id: recipeIngredientId,
    });
    if (!recipeIngredient) {
        res.status(404).json({ detail: `Recipe ingredient with id ${recipeIngredientId} not found` });
        return;
    }
    if (recipeIngredient.recipe.user.username !== res.locals.jwtPayload.username) {
        res.status(403).json({ detail: `You can not edit recipe ingredient with id ${recipeIngredientId}` });
        return;
    }

    const {recipeId, ingredientId, quantity, unit} = req.body;
    let payload = {};

    if (recipeId) {
        const recipe = await recipeRepository.findOneBy({
            recipe_id: parseInt(recipeId),
        });

        if (recipe) {
            payload["recipe"] = recipe;
        }
    }

    if (ingredientId) {
        const ingredient = await ingredientRepository.findOneBy({
            ingredient_id: parseInt(ingredientId),
        });

        if (ingredient) {
            payload["ingredient"] = ingredient;
        }
    }

    if (quantity) {
        payload["quantity"] = quantity;
    }

    if (unit) {
        payload["unit"] = unit;
    }

    recipeIngredientRepository.merge(recipeIngredient, payload);
    const results = await recipeIngredientRepository.save(recipeIngredient);
    res.send(results);
});

/**
 * @swagger
 * /recipes-ingredients/{id}:
 *   delete:
 *     summary: Удалить ингредиент из рецепта по ID
 *     tags: [RecipeIngredients]
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
 *         description: Ингредиент успешно удалён
 *       403:
 *         description: Нет прав на удаление
 *       404:
 *         description: Ингредиент не найден
 */
recipeIngredientRouter.delete("/:id", [checkJwt], async function (req: Request, res: Response) {
    const recipeIngredientId = parseInt(req.params.id);
    
    const recipeIngredient = await recipeIngredientRepository.findOneBy({
        id: recipeIngredientId,
    });
    if (!recipeIngredient) {
        res.status(404).json({ detail: `Recipe ingredient with id ${recipeIngredientId} not found` });
        return;
    }
    if (recipeIngredient.recipe.user.username !== res.locals.jwtPayload.username) {
        res.status(403).json({ detail: `You can not edit recipe ingredient with id ${recipeIngredientId}` });
        return;
    }

    const results = await recipeIngredientRepository.delete(recipeIngredientId);
    if (!results.affected || results.affected === 0) {
        res.status(404).json({ detail: `Recipe ingredient with id ${recipeIngredientId} not found` });
        return;
    }
    res.send(results);
});

export default recipeIngredientRouter;
