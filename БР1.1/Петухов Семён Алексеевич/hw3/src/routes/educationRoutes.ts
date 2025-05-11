import { Router } from "express";
import * as controller from "../controllers/educationController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Educations
 *   description: Управление записями об образовании
 */

/**
 * @swagger
 * /api/educations:
 *   get:
 *     summary: Получить все записи об образовании
 *     tags: [Educations]
 *     responses:
 *       200:
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Education'
 */
router.get("/", controller.getAllEducations);

/**
 * @swagger
 * /api/educations/{id}:
 *   get:
 *     summary: Получить запись об образовании по ID
 *     tags: [Educations]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID записи
 *     responses:
 *       200:
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Education'
 *       404:
 *         description: Запись не найдена
 */
router.get("/:id", controller.getEducationById);

/**
 * @swagger
 * /api/educations:
 *   post:
 *     summary: Создать новую запись об образовании
 *     tags: [Educations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - institution
 *               - degree
 *               - startDate
 *               - endDate
 *             properties:
 *               institution:
 *                 type: string
 *               degree:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Запись создана
 *       400:
 *         description: Ошибка валидации
 */
router.post("/", controller.createEducation);

/**
 * @swagger
 * /api/educations/{id}:
 *   put:
 *     summary: Обновить запись об образовании по ID
 *     tags: [Educations]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID записи
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               institution:
 *                 type: string
 *               degree:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Запись обновлена
 *       404:
 *         description: Запись не найдена
 */
router.put("/:id", controller.updateEducation);

/**
 * @swagger
 * /api/educations/{id}:
 *   delete:
 *     summary: Удалить запись об образовании по ID
 *     tags: [Educations]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID записи
 *     responses:
 *       200:
 *         description: Запись удалена
 *       404:
 *         description: Запись не найдена
 */
router.delete("/:id", controller.deleteEducation);

export default router;
