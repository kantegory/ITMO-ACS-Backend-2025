import { Router } from "express";
import * as controller from "../controllers/motivation_letterController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: MotivationLetters
 *   description: Управление мотивационными письмами
 */

/**
 * @swagger
 * /api/motivation-letters:
 *   get:
 *     summary: Получить все мотивационные письма
 *     tags: [MotivationLetters]
 *     responses:
 *       200:
 *         description: Список мотивационных писем
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MotivationLetter'
 */
router.get("/", controller.getAllLetters);

/**
 * @swagger
 * /api/motivation-letters/{id}:
 *   get:
 *     summary: Получить мотивационное письмо по ID
 *     tags: [MotivationLetters]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID письма
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Мотивационное письмо найдено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MotivationLetter'
 *       404:
 *         description: Письмо не найдено
 */
router.get("/:id", controller.getLetterById);

/**
 * @swagger
 * /api/motivation-letters:
 *   post:
 *     summary: Создать новое мотивационное письмо
 *     tags: [MotivationLetters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - userId
 *               - vacancyId
 *             properties:
 *               content:
 *                 type: string
 *               userId:
 *                 type: integer
 *               vacancyId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Письмо создано
 */
router.post("/", controller.createLetter);

/**
 * @swagger
 * /api/motivation-letters/{id}:
 *   put:
 *     summary: Обновить мотивационное письмо по ID
 *     tags: [MotivationLetters]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID письма
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Письмо обновлено
 *       404:
 *         description: Письмо не найдено
 */
router.put("/:id", controller.updateLetter);

/**
 * @swagger
 * /api/motivation-letters/{id}:
 *   delete:
 *     summary: Удалить мотивационное письмо по ID
 *     tags: [MotivationLetters]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID письма
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Письмо удалено
 *       404:
 *         description: Письмо не найдено
 */
router.delete("/:id", controller.deleteLetter);

export default router;
