import { Router } from "express";
import { Request, Response } from "express";
import { Recipe } from "../entities/Recipe";
import { dataSource } from "../dataSource";
import { SavedRecipe } from "../entities/SavedRecipe";
import { User } from "../entities/User";
import { checkJwt } from "../middleware/validateJWT";

const savedRecipeRouter = Router();

const recipeRepository = dataSource.getRepository(Recipe);
const userRepository = dataSource.getRepository(User);
const savedRecipeRepository = dataSource.getRepository(SavedRecipe);

/**
 * @swagger
 * components:
 *   schemas:
 *     SavedRecipe:
 *       type: object
 *       properties:
 *         saved_recipe_id:
 *           type: integer
 *         recipe:
 *           type: object
 *           properties:
 *             recipe_id:
 *               type: integer
 *             title:
 *               type: string
 *             description:
 *               type: string
 *         user:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *       required:
 *         - recipe
 *         - user
 */

/**
 * @swagger
 * /saved-recipes:
 *   post:
 *     summary: Сохранить рецепт
 *     tags: [SavedRecipes]
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
 *     responses:
 *       200:
 *         description: Рецепт успешно сохранен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SavedRecipe'
 *       404:
 *         description: Рецепт или пользователь не найден
 *       401:
 *         description: Неавторизован
 */
savedRecipeRouter.post("/", [checkJwt], async function (req: Request, res: Response) {
    const username = res.locals.jwtPayload.username;
    const user = await userRepository.findOneBy({username});

    if (!user) {
        res.status(404).json({detail: `User with username ${username} not found`});
        return;
    }

    const { recipeId } = req.body;
    const recipe = await recipeRepository.findOneBy({recipe_id: recipeId});
    if (!recipe) {
        res.status(404).json({detail: `Recipe with id ${recipeId} not found`});
    }
    const savedRecipe = savedRecipeRepository.create({user, recipe});
    const results = await savedRecipeRepository.save(savedRecipe);
    res.send(results);
});

/**
 * @swagger
 * /saved-recipes:
 *   get:
 *     summary: Получить список сохраненных рецептов
 *     tags: [SavedRecipes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список сохраненных рецептов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SavedRecipe'
 *       404:
 *         description: Пользователь не найден
 *       401:
 *         description: Неавторизован
 */
savedRecipeRouter.get("/", [checkJwt], async function (req: Request, res: Response) {
    const username = res.locals.jwtPayload.username;
    const user = await userRepository.findOneBy({username});

    if (!user) {
        res.status(404).json({detail: `User with username ${username} not found`});
        return;
    }

    const queryBuilder = savedRecipeRepository.createQueryBuilder("saved_recipe");
    const savedRecipes = await queryBuilder
        .leftJoinAndSelect("saved_recipe.recipe", "recipe")
        .leftJoin("saved_recipe.user", "user")
        .where("user.username = :username", {username: user.username})
        .getMany();
    res.json(savedRecipes);
});

/**
 * @swagger
 * /saved-recipes/{id}:
 *   delete:
 *     summary: Удалить сохраненный рецепт по ID
 *     tags: [SavedRecipes]
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
 *         description: Сохраненный рецепт успешно удален
 *       404:
 *         description: Сохраненный рецепт не найден
 *       403:
 *         description: Нет прав для удаления сохраненного рецепта
 *       401:
 *         description: Неавторизован
 */
savedRecipeRouter.delete("/:id", [checkJwt], async function (req: Request, res: Response) {
    const savedRecipeId = parseInt(req.params.id);

    const savedRecipe = await savedRecipeRepository.findOneBy({saved_recipe_id: savedRecipeId});
    if (!savedRecipe) {
        res.status(404).json({detail: `Saved recipe with id ${savedRecipeId} not found`});
        return;
    }
    if (savedRecipe.user.username !== res.locals.jwtPayload.username) {
        res.status(403).json({detail: `You can not delete saved recipe with id ${savedRecipeId}`});
        return;
    }

    const results = await savedRecipeRepository.delete(savedRecipeId);
    if (!results.affected || results.affected === 0) {
        res.status(404).json({ detail: `Saved recipe with id ${savedRecipeId} not found` });
        return;
    }
    res.send(results);
});

export default savedRecipeRouter;
