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
 * components:
 *   schemas:
 *     Education:
 *       type: object
 *       required:
 *         - education_level
 *       properties:
 *         id:
 *           type: integer
 *           description: Уникальный ID записи
 *         education_level:
 *           type: string
 *           description: Уровень образования
 *       example:
 *         id: 1
 *         education_level: "Bachelor's Degree"
 */

/**
 * @swagger
 * /api/educations:
 *   get:
 *     summary: Получить все записи об образовании
 *     tags: [Educations]
 *     responses:
 *       200:
 *         description: Список записей об образовании
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
 *         description: Найденная запись
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
 *             $ref: '#/components/schemas/Education'
 *     responses:
 *       201:
 *         description: Запись успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Education'
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
 *             $ref: '#/components/schemas/Education'
 *     responses:
 *       200:
 *         description: Запись обновлена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Education'
 *       400:
 *         description: Ошибка валидации
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deleted:
 *                   type: integer
 *       404:
 *         description: Запись не найдена
 */
router.delete("/:id", controller.deleteEducation);

export default router;
