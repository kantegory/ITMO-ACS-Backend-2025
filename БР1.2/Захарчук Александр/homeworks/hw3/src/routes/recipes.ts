import { Router } from "express";
import { Request, Response } from "express";
import { Recipe } from "../entities/Recipe";
import { User } from "../entities/User";
import { dataSource } from "../dataSource";
import { checkJwt } from "../middleware/validateJWT";

const recipeRouter = Router();

const recipeRepository = dataSource.getRepository(Recipe);
const userRepository = dataSource.getRepository(User);

/**
 * @swagger
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       properties:
 *         recipe_id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         dish_type:
 *           type: string
 *           enum: [appetizer, main_course, dessert, salad, soup, side_dish, breakfast, snack, beverage]
 *         difficulty_level:
 *           type: string
 *           enum: [beginner, easy, medium, hard, expert]
 *         preparation_time_minutes:
 *           type: integer
 *         cooking_time_minutes:
 *           type: integer
 *         user:
 *           $ref: '#/components/schemas/User'
 *         ingredients:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Ingredient'
 *         steps:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               recipe_step_id:
 *                 type: integer
 *               step_number:
 *                 type: integer
 *               instruction:
 *                 type: string
 *               image:
 *                 type: string
 *               video:
 *                 type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *       required:
 *         - recipe_id
 *         - title
 *         - description
 *         - dish_type
 *         - difficulty_level
 *         - preparation_time_minutes
 *         - cooking_time_minutes
 *         - user
 *         - ingredients
 *         - steps
 *         - created_at
 *         - updated_at
 */

/**
 * @swagger
 * /recipes:
 *   post:
 *     summary: Создать новый рецепт
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - dish_type
 *               - difficulty_level
 *               - preparation_time_minutes
 *               - cooking_time_minutes
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dish_type:
 *                 type: string
 *                 enum: [appetizer, main_course, dessert, salad, soup, side_dish, breakfast, snack, beverage]
 *               difficulty_level:
 *                 type: string
 *                 enum: [beginner, easy, medium, hard, expert]
 *               preparation_time_minutes:
 *                 type: integer
 *               cooking_time_minutes:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Рецепт успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Пользователь не найден
 *       401:
 *         description: Неавторизован
 */
recipeRouter.post("/", [checkJwt], async function (req: Request, res: Response) {
    const username = res.locals.jwtPayload.username;
    const user = await userRepository.findOneBy({username})

    if (!user) {
        res.status(404).json({detail: `User with username ${username} not found`});
        return;
    }

    const recipe = recipeRepository.create({...req.body, user});
    const results = await recipeRepository.save(recipe);
    res.send(results);
});

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Получить все рецепты
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список рецептов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       401:
 *         description: Неавторизован
 */
recipeRouter.get("/", [checkJwt], async function (req: Request, res: Response) {
    const results = await recipeRepository
        .createQueryBuilder("recipe")
        .leftJoinAndSelect("recipe.ingredients", "recipeIngredient")
        .leftJoinAndSelect("recipeIngredient.ingredient", "ingredient")
        .leftJoinAndSelect("recipe.steps", "steps")
        .leftJoinAndSelect("recipe.user", "user")
        .orderBy("steps.step_number", "ASC")
        .getMany();
    res.json(results);
});

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     summary: Получить рецепт по ID
 *     tags: [Recipes]
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
 *         description: Рецепт найден
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Рецепт не найден
 *       401:
 *         description: Неавторизован
 */
recipeRouter.get("/:id", [checkJwt], async function (req: Request, res: Response) {
    const recipeId = parseInt(req.params.id);
    const results = await recipeRepository
        .createQueryBuilder("recipe")
        .leftJoinAndSelect("recipe.ingredients", "recipeIngredient")
        .leftJoinAndSelect("recipeIngredient.ingredient", "ingredient")
        .leftJoinAndSelect("recipe.steps", "steps")
        .leftJoinAndSelect("recipe.user", "user")
        .where("recipe.recipe_id = :recipeId", { recipeId })
        .orderBy("steps.step_number", "ASC")
        .getOne();
    if (!results) {
        res.status(404).json({ detail: `Recipe with id ${recipeId} not found` });
        return;
    }
    res.send(results);
});

/**
 * @swagger
 * /recipes/{id}:
 *   put:
 *     summary: Обновить рецепт по ID
 *     tags: [Recipes]
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
 *             required:
 *               - title
 *               - description
 *               - dish_type
 *               - difficulty_level
 *               - preparation_time_minutes
 *               - cooking_time_minutes
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dish_type:
 *                 type: string
 *                 enum: [appetizer, main_course, dessert, salad, soup, side_dish, breakfast, snack, beverage]
 *               difficulty_level:
 *                 type: string
 *                 enum: [beginner, easy, medium, hard, expert]
 *               preparation_time_minutes:
 *                 type: integer
 *               cooking_time_minutes:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Рецепт успешно обновлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Рецепт не найден
 *       403:
 *         description: Нет прав для редактирования рецепта
 */
recipeRouter.put("/:id", [checkJwt], async function (req: Request, res: Response) {
    const recipeId = parseInt(req.params.id);
    const recipe = await recipeRepository.findOneBy({
        recipe_id: recipeId,
    });
    if (!recipe) {
        res.status(404).json({ detail: `Recipe with id ${recipeId} not found` });
        return;
    }
    if (recipe.user.username !== res.locals.jwtPayload.username) {
        res.status(403).json({ detail: `You can not edit recipe with id ${recipeId}` });
        return;
    }
    recipeRepository.merge(recipe, req.body);
    const results = await recipeRepository.save(recipe);
    res.send(results);
});

/**
 * @swagger
 * /recipes/{id}:
 *   delete:
 *     summary: Удалить рецепт по ID
 *     tags: [Recipes]
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
 *         description: Рецепт успешно удален
 *       404:
 *         description: Рецепт не найден
 *       403:
 *         description: Нет прав для удаления рецепта
 */
recipeRouter.delete("/:id", [checkJwt], async function (req: Request, res: Response) {
    const recipeId = parseInt(req.params.id);

    const recipe = await recipeRepository.findOneBy({
        recipe_id: recipeId,
    });
    if (!recipe) {
        res.status(404).json({ detail: `Recipe with id ${recipeId} not found` });
        return;
    }
    if (recipe.user.username !== res.locals.jwtPayload.username) {
        res.status(403).json({ detail: `You can not edit recipe with id ${recipeId}` });
        return;
    }

    const results = await recipeRepository.delete(recipeId);
    if (!results.affected || results.affected === 0) {
        res.status(404).json({ detail: `Recipe with id ${recipeId} not found` });
        return;
    }
    res.send(results);
});

export default recipeRouter;
