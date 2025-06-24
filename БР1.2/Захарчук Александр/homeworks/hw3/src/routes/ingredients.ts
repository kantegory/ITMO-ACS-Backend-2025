import { Router } from "express";
import { Request, Response } from "express";
import { Ingredient } from "../entities/Ingredient";
import { dataSource } from "../dataSource";
import { checkJwt } from "../middleware/validateJWT";

const ingredientRouter = Router();
const ingredientRepository = dataSource.getRepository(Ingredient);

/**
 * @swagger
 * tags:
 *   name: Ingredients
 *   description: API для управления ингредиентами
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Ingredient:
 *       type: object
 *       properties:
 *         ingredient_id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         created_at:
 *           type: string
 *           format:
 *             date-time
 *         updated_at:
 *           type: string
 *           format:
 *             date-time
 *       required:
 *         - ingredient_id
 *         - name
 *         - description
 *         - created_at
 *         - updated_at
 */

/**
 * @swagger
 * /ingredients:
 *   post:
 *     summary: Создать ингредиент
 *     tags: [Ingredients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ингредиент успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       401:
 *         description: Неавторизован
 */
ingredientRouter.post("/", [checkJwt], async function (req: Request, res: Response) {
    const ingredient = ingredientRepository.create(req.body);
    const results = await ingredientRepository.save(ingredient);
    res.send(results);
});

/**
 * @swagger
 * /ingredients:
 *   get:
 *     summary: Получить список всех ингредиентов
 *     tags: [Ingredients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список ингредиентов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingredient'
 */
ingredientRouter.get("/", [checkJwt], async function (req: Request, res: Response) {
    const ingredients = await ingredientRepository.find();
    res.json(ingredients);
});

/**
 * @swagger
 * /ingredients/{id}:
 *   get:
 *     summary: Получить ингредиент по ID
 *     tags: [Ingredients]
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
 *         description: Найденный ингредиент
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       404:
 *         description: Ингредиент не найден
 */
ingredientRouter.get("/:id", [checkJwt], async function (req: Request, res: Response) {
    const ingredientId = parseInt(req.params.id);
    const results = await ingredientRepository.findOneBy({
        ingredient_id: ingredientId,
    });
    if (!results) {
        res.status(404).json({ detail: `Ingredient with id ${ingredientId} not found` });
        return;
    }
    res.send(results);
});

/**
 * @swagger
 * /ingredients/{id}:
 *   put:
 *     summary: Обновить ингредиент
 *     tags: [Ingredients]
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ингредиент обновлён
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       404:
 *         description: Ингредиент не найден
 */
ingredientRouter.put("/:id", [checkJwt], async function (req: Request, res: Response) {
    const ingredientId = parseInt(req.params.id);
    const ingredient = await ingredientRepository.findOneBy({
        ingredient_id: ingredientId,
    });
    if (!ingredient) {
        res.status(404).json({ detail: `Ingredient with id ${ingredientId} not found` });
        return;
    }
    ingredientRepository.merge(ingredient, req.body);
    const results = await ingredientRepository.save(ingredient);
    res.send(results);
});

/**
 * @swagger
 * /ingredients/{id}:
 *   delete:
 *     summary: Удалить ингредиент
 *     tags: [Ingredients]
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
 *         description: Ингредиент удалён
 *       404:
 *         description: Ингредиент не найден
 */
ingredientRouter.delete("/:id", [checkJwt], async function (req: Request, res: Response) {
    const ingredientId = parseInt(req.params.id);
    const results = await ingredientRepository.delete(ingredientId);
    if (!results.affected || results.affected === 0) {
        res.status(404).json({ detail: `Ingredient with id ${ingredientId} not found` });
        return;
    }
    res.send(results);
});

export default ingredientRouter;
