/**
 * @swagger
 * tags:
 *   name: MotivationLetters
 *   description: Работа с мотивационными письмами
 */

/**
 * @swagger
 * /motivation_letter:
 *   get:
 *     tags: [MotivationLetters]
 *     summary: Получить все мотивационные письма
 *     responses:
 *       200:
 *         description: Список писем
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MotivationLetter'

 *   post:
 *     tags: [MotivationLetters]
 *     summary: Создать мотивационное письмо
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MotivationLetterInput'
 *     responses:
 *       201:
 *         description: Письмо создано
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MotivationLetter'

 * /motivation_letter/{id}:
 *   get:
 *     tags: [MotivationLetters]
 *     summary: Получить мотивационное письмо по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Одно письмо
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MotivationLetter'

 *   put:
 *     tags: [MotivationLetters]
 *     summary: Обновить письмо
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
 *             $ref: '#/components/schemas/MotivationLetterInput'
 *     responses:
 *       200:
 *         description: Письмо обновлено

 *   delete:
 *     tags: [MotivationLetters]
 *     summary: Удалить письмо
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Удалено
 */

import { Router } from "express";
import * as controller from "../controllers/motivation_letterController";
import { verifyToken } from "../libs/auth";
const router = Router();

router.get("/", verifyToken, controller.getAllLetters);


router.get("/:id", verifyToken, controller.getLetterById);


router.post("/", verifyToken, controller.createLetter);


router.put("/:id", verifyToken, controller.updateLetter);

router.delete("/:id", verifyToken, controller.deleteLetter);

export default router;
