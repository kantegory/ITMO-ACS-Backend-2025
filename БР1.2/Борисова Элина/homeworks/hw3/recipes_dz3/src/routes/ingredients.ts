import { Router } from "express";
import {
    createIngredient,
    getIngredients,
    getIngredientById,
    updateIngredient,
    deleteIngredient
} from "../controllers/ingredient.controller";

const router = Router();

/**
 * @openapi
 * /ingredients:
 *   post:
 *     summary: Создать ингредиент
 *     tags:
 *       - Ingredients
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ингредиент создан
 */
router.post("/", createIngredient);

/**
 * @openapi
 * /ingredients:
 *   get:
 *     summary: Получить список всех ингредиентов
 *     tags:
 *       - Ingredients
 *     responses:
 *       200:
 *         description: Список ингредиентов
 */
router.get("/", getIngredients);

/**
 * @openapi
 * /ingredients/{id}:
 *   get:
 *     summary: Получить ингредиент по ID
 *     tags:
 *       - Ingredients
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ингредиент найден
 *       404:
 *         description: Ингредиент не найден
 */
router.get("/:id", getIngredientById);

/**
 * @openapi
 * /ingredients/{id}:
 *   put:
 *     summary: Обновить ингредиент
 *     tags:
 *       - Ingredients
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ингредиент обновлён
 *       404:
 *         description: Ингредиент не найден
 */
router.put("/:id", updateIngredient);

/**
 * @openapi
 * /ingredients/{id}:
 *   delete:
 *     summary: Удалить ингредиент
 *     tags:
 *       - Ingredients
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Ингредиент удалён
 *       404:
 *         description: Ингредиент не найден
 */
router.delete("/:id", deleteIngredient);

export default router;